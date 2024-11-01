use std::ops::Deref;

use tauri::{generate_handler, ipc::Invoke, AppHandle, Manager};

use super::config::{AppConfig, ConfigManager};

#[tauri::command]
async fn get_config(app: AppHandle) -> Result<AppConfig, String> {
    let config_manager = app.state::<ConfigManager>();
    let config = config_manager.config.lock().await;

    Ok(config.deref().clone())
}
#[tauri::command]
async fn set_config(app: AppHandle, config: AppConfig) {
    let config_manager = app.state::<ConfigManager>();
    let mut config_mutex = config_manager.config.lock().await;

    *config_mutex = config;

    config_manager.save().await;
}

pub fn generate_handler() -> impl Fn(Invoke) -> bool {
    generate_handler![get_config, set_config]
}
