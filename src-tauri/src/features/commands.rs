use super::config::{AppConfig, ConfigManager};
use std::ops::Deref;
use tauri::{generate_handler, ipc::Invoke, AppHandle, Manager};

#[tauri::command]
async fn get_config(app: AppHandle) -> Result<AppConfig, String> {
    println!("state from get_config");
    let config_manager = app.state::<ConfigManager>();
    let config = config_manager.lock_config().await;
    Ok(config.deref().clone())
}
#[tauri::command]
async fn set_config(app: AppHandle, new_config: AppConfig) -> Result<(), String> {
    println!("state from set_config");
    let config_manager = app.state::<ConfigManager>();
    {
        let mut config = config_manager.lock_config().await;
        *config = new_config.clone();
    }

    config_manager
        .update_formatter()
        .await
        .map_err(|err| err.to_string())?;
    config_manager.save().await;

    Ok(())
}

pub fn generate_handler() -> impl Fn(Invoke) -> bool {
    generate_handler![get_config, set_config]
}
