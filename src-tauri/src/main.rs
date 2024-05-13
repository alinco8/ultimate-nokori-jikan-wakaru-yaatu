#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod tray;

use tauri::AppHandle;
use tray::{build_menu, on_system_tray_event};

#[tauri::command]
fn update_title(title: &str, app_handle: AppHandle) {
    let _ = app_handle.tray_handle().set_title(title);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![update_title])
        .setup(|app| {
            let tray = tauri::SystemTray::new().with_menu(build_menu());
            let tray_handle = tray.build(app)?;

            #[cfg(target_os = "macos")]
            {
                let _ = tray_handle.set_title("13:17");
            }

            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            Ok(())
        })
        .on_system_tray_event(on_system_tray_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
