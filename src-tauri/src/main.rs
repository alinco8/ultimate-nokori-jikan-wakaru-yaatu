#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{menu::MenuBuilder, tray::TrayIconId, App, AppHandle, Manager, State};
// use tauri_plugin_log::{Target, TargetKind, WEBVIEW_TARGET};

struct TrayIdManager {
    id: Mutex<Option<TrayIconId>>,
}
impl TrayIdManager {
    pub fn new(id: Option<TrayIconId>) -> Self {
        Self { id: Mutex::new(id) }
    }
    pub fn get_id(&self) -> Option<TrayIconId> {
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
    if let Some(id) = &tray_id_manager.get_id() {
        let _ = app_handle.tray_by_id(id).unwrap().set_title(Some(title));
    } else {
        println!("Tray Not Found")
    }
}
#[tauri::command]
fn hide_tray(app_handle: AppHandle, tray_id_manager: State<'_, TrayIdManager>) {
    if let Some(id) = &tray_id_manager.get_id() {
        app_handle.remove_tray_by_id(id);
    };
}

fn build_tray(app_handle: &AppHandle) {
    let tray_id_manager = app_handle.state::<TrayIdManager>();

    let menu = MenuBuilder::new(app_handle)
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
        .build(app_handle)
        .unwrap();

    *tray_id_manager.id.lock().unwrap() = Some(tray.id().clone());
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
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![update_title, hide_app])
        .setup(|app: &mut App| {
            let handle = app.handle();

            #[cfg(debug_assertions)]
            {
                handle.get_webview_window("main").unwrap().open_devtools();
            }

            build_tray(handle);

            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;

            Ok(())
        })
        // .on_system_tray_event(on_system_tray_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
