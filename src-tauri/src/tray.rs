use tauri::{AppHandle, CustomMenuItem, SystemTrayMenu};

fn _set_menu_item(app_handle: tauri::AppHandle, id: &str, title: &str) {
    let item_handle = app_handle.tray_handle().get_item(id);
    item_handle.set_title(title).unwrap();
}

pub fn build_menu() -> SystemTrayMenu {
    SystemTrayMenu::new().add_item(CustomMenuItem::new("quit".to_string(), "終了"))
}
pub fn on_system_tray_event(_app: &AppHandle, event: tauri::SystemTrayEvent) {
    match event {
        tauri::SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => std::process::exit(0),
            _ => {}
        },
        tauri::SystemTrayEvent::LeftClick { .. } => {}
        _ => {}
    }
}
