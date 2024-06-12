#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{menu::MenuBuilder, tray::TrayIconId, App, AppHandle, Manager, State};
// use tauri_plugin_log::{Target, TargetKind, WEBVIEW_TARGET};

struct TrayIdManager {
    id: Mutex<TrayIconId>,
}
impl TrayIdManager {
    pub fn new(id: TrayIconId) -> Self {
        Self { id: Mutex::new(id) }
    }
    pub fn get_id(&self) -> TrayIconId {
        self.id.lock().unwrap().clone()
    }
}

#[tauri::command]
fn hide_app(app_handle: AppHandle) {
    let _ = app_handle.set_activation_policy(tauri::ActivationPolicy::Accessory);
    let window = app_handle.get_webview_window("main").unwrap();

    let _ = window.hide();
    let _ = window.set_focus();
}
#[tauri::command]
fn update_title(title: &str, app_handle: AppHandle, tray_id_manager: State<'_, TrayIdManager>) {
    let _ = app_handle
        .tray_by_id(&tray_id_manager.get_id())
        .unwrap()
        .set_title(Some(title));
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
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
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![update_title, hide_app])
        .setup(|app: &mut App| {
            let handle = app.handle();
            let menu = MenuBuilder::new(app)
                .text("show_app", "アプリを表示")
                .separator()
                .quit()
                .build()
                .unwrap();

            let tray = tauri::tray::TrayIconBuilder::new()
                .menu(&menu)
                // .icon(tauri::image::Image::from_path("icons/icon.png").unwrap())
                .icon_as_template(true)
                .title("起動中...")
                .on_menu_event(|app_handle, e| match e.id().as_ref() {
                    "show_app" => {
                        let _ = app_handle.get_webview_window("main").unwrap().show();
                        let _ = app_handle.set_activation_policy(tauri::ActivationPolicy::Regular);
                    }
                    _ => (),
                })
                .build(app)
                .unwrap();

            handle.manage(TrayIdManager::new(tray.id().clone()));

            #[cfg(debug_assertions)]
            {
                handle.get_webview_window("main").unwrap().open_devtools();
            }

            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;

            Ok(())
        })
        // .on_system_tray_event(on_system_tray_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
