use tauri::AppHandle;

pub mod commands;
pub mod config;
pub mod tray;
pub mod updater;

pub fn setup(app: &AppHandle) {
    config::setup(&app);
    tray::setup(&app);
    updater::setup(&app);
}
