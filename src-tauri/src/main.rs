mod manager;
mod schedule;

use chrono_tz::Asia;
use manager::ManagerWithLock;
use schedule::{get_closest, Schedule, SchedulesManager};
use std::{
    sync::{Mutex, MutexGuard},
    time::Duration,
    vec,
};
use tauri::{menu::MenuBuilder, tray::TrayIconId, AppHandle, Manager};
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_updater::UpdaterExt;
// use tauri_plugin_log::{Target, TargetKind, WEBVIEW_TARGET};

struct TrayIdManager {
    id: Mutex<Option<TrayIconId>>,
}
impl ManagerWithLock<Option<TrayIconId>> for TrayIdManager {
    fn new(id: Option<TrayIconId>) -> Self {
        Self { id: Mutex::new(id) }
    }
    fn lock(&self) -> MutexGuard<Option<TrayIconId>> {
        self.id.lock().expect("failed to lock tray id manager")
    }
}
struct ConfigManager {
    config: Mutex<String>,
}
impl ManagerWithLock<String> for ConfigManager {
    fn new(string: String) -> Self {
        Self {
            config: Mutex::new(string),
        }
    }
    fn lock(&self) -> MutexGuard<String> {
        self.config.lock().expect("failed to lock config manager")
    }
}

#[tauri::command]
fn hide_app(app_handle: AppHandle) {
    app_handle
        .set_activation_policy(tauri::ActivationPolicy::Accessory)
        .expect("set activation policy failed.");
    let window = app_handle
        .get_webview_window("main")
        .expect("failed to get window: main");

    window.hide().expect("window hide failed.");
}
#[tauri::command]
fn set_schedules(schedules: Vec<Schedule>, app_handle: AppHandle) {
    *app_handle.state::<SchedulesManager>().lock() = Some(schedules);
}
#[tauri::command]
fn set_config(app_handle: AppHandle, config: String) {
    *app_handle.state::<ConfigManager>().lock() = config;
}

fn build_tray(app_handle: &AppHandle) {
    let tray_id_manager = app_handle.state::<TrayIdManager>();
    let schedules_manager = app_handle.state::<SchedulesManager>();

    if let Some(id) = tray_id_manager.lock().clone() {
        app_handle.remove_tray_by_id(&id);
    }

    let mut menu_builder = MenuBuilder::new(app_handle)
        .text("show_app", "アプリを表示")
        .separator();

    if let Some(schedules) = schedules_manager.lock().as_ref() {
        for menu_item in schedules {
            menu_builder = menu_builder.text(&menu_item.name, &menu_item.name);
        }
    }

    let menu = menu_builder
        .separator()
        .quit()
        .build()
        .expect("failed to build menu");

    let tray = tauri::tray::TrayIconBuilder::new()
        .menu(&menu)
        .icon_as_template(true)
        .title("起動中...")
        .on_menu_event(|app_handle, e| match e.id().as_ref() {
            "show_app" => {
                let window = &app_handle
                    .get_webview_window("main")
                    .expect("failed to get window: main");
                window.show().expect("failed to show window");
                window.set_focus().expect("failed to focus window");
                app_handle
                    .set_activation_policy(tauri::ActivationPolicy::Regular)
                    .expect("failed to set activation policy")
            }
            _ => (),
        })
        .build(app_handle)
        .expect("failed to build tray");

    *tray_id_manager.lock() = Some(tray.id().clone());
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        // .plugin(
        //     tauri_plugin_log::Builder::new()
        //         .targets([
        //             Target::new(TargetKind::Webview),
        //             Target::new(TargetKind::Stderr),
        //             Target::new(TargetKind::LogDir {
        //                 file_name: Some("webview".into()),
        //             })
        //             .filter(|metadata| metadata.target() == WEBVIEW_TARGET),
        //             Target::new(TargetKind::LogDir {
        //                 file_name: Some("rust".into()),
        //             })
        //             .filter(|metadata| metadata.target() != WEBVIEW_TARGET),
        //         ])
        //         .build(),
        // )
        .manage(TrayIdManager::new(None))
        .manage(SchedulesManager::new(None))
        .manage(ConfigManager::new(String::from("normal")))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            hide_app,
            set_schedules,
            set_config
        ])
        .setup(|app| {
            let handle = app.handle();
            build_tray(handle);

            #[cfg(debug_assertions)]
            {
                handle
                    .get_webview_window("main")
                    .expect("failed to get window: main")
                    .open_devtools();
            }

            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;

            let app_handle_updater = handle.to_owned();
            let app_handle_interval = handle.to_owned();

            tauri::async_runtime::spawn(async move {
                let app_handle = app_handle_updater.to_owned();
                let updater = app_handle.updater().expect("update failed");

                if let Ok(Some(update)) = updater.check().await {
                    app_handle
                        .dialog()
                        .message(format!(
                            "アップデートしますか？\n{} => {}",
                            update.version, update.current_version
                        ))
                        .title("アップデートが見つかりました")
                        .ok_button_label("アップデート")
                        .cancel_button_label("5分後に再通知")
                        .blocking_show();
                }
            });

            tauri::async_runtime::spawn(async move {
                let schedules_manager = app_handle_interval.state::<SchedulesManager>().to_owned();
                let tray_id_manager: tauri::State<TrayIdManager> =
                    app_handle_interval.state::<TrayIdManager>().to_owned();
                let config_manager: tauri::State<ConfigManager> =
                    app_handle_interval.state::<ConfigManager>().to_owned();

                loop {
                    if let Some(schedules) = schedules_manager.lock().clone() {
                        if let Some(id) = tray_id_manager.lock().clone() {
                            let config = config_manager.lock();

                            let tray = app_handle_interval
                                .tray_by_id(&id)
                                .expect("failed to get tray");

                            let curr_option =
                                get_closest(&schedules, schedule::ClosestMode::Before);
                            let next_option = get_closest(&schedules, schedule::ClosestMode::After);

                            match &config[..] {
                                "normal" => tray
                                    .set_title(Some(format!(
                                        "{} ={}=> {}",
                                        if let Some(curr) = curr_option {
                                            curr.name
                                        } else {
                                            "なし".to_string()
                                        },
                                        if let Some(next) = next_option.clone() {
                                            let remind_time = next.get_remind_time();

                                            format!(
                                                "{:>02}:{:>02}:{:>02}",
                                                ((remind_time) as f32 / 3600.0).floor(),
                                                ((remind_time % 3600) as f32 / 60.0).floor(),
                                                remind_time % 60
                                            )
                                        } else {
                                            "なし".to_string()
                                        },
                                        if let Some(next) = next_option {
                                            next.name
                                        } else {
                                            "なし".to_string()
                                        }
                                    )))
                                    .expect("failed to set title"),
                                "compact" => {
                                    if let Some(next) = next_option {
                                        let remind_time = next.get_remind_time();

                                        tray.set_title(Some(format!(
                                            "{:>02}:{:>02}",
                                            ((remind_time as f32) / 60.0).floor(),
                                            remind_time % 60
                                        )))
                                        .expect("failed to set title");
                                    } else {
                                        tray.set_title(Some("予定なし"))
                                            .expect("failed to set title");
                                    }
                                }
                                _ => (),
                            }
                        }
                    }

                    let utc = chrono::Utc::now();
                    let jst = utc.with_timezone(&Asia::Tokyo);

                    tokio::time::sleep(Duration::from_millis(
                        (1000 - jst.timestamp_subsec_millis()).into(),
                    ))
                    .await;
                }
            });

            Ok(())
        })
        // .on_system_tray_event(on_system_tray_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
