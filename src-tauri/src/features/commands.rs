use crate::libs::schedule::Schedule;

use super::{
    config::{AppConfig, ConfigManager},
    tray::TrayIdManager,
};
use std::{collections::HashMap, ops::Deref};
use tauri::{generate_handler, ipc::Invoke, AppHandle, Manager};

#[tauri::command]
async fn get_config(app: AppHandle) -> Result<AppConfig, String> {
    let config_manager = app.state::<ConfigManager>();
    let config = config_manager.lock_config().await;
    Ok(config.deref().clone())
}
#[tauri::command]
async fn set_config(app: AppHandle, new_config: AppConfig) -> Result<(), String> {
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
#[tauri::command]
async fn update_tray(app: AppHandle) -> Result<(), String> {
    let config_manager = app.state::<ConfigManager>();
    let tray_id_manager = app.state::<TrayIdManager>();
    let mut data = HashMap::<&str, Option<Schedule>>::new();
    let tray = app.tray_by_id(&tray_id_manager.id).unwrap();

    super::tray::update_tray(&config_manager, &mut data, &tray).await;

    Ok(())
}
#[tauri::command]
async fn reset_config(app: AppHandle) -> Result<(), String> {
    let config_manager = app.state::<ConfigManager>();

    {
        *config_manager.lock_config().await = AppConfig::default()
    }

    let tray_id_manager = app.state::<TrayIdManager>();
    let mut data = HashMap::<&str, Option<Schedule>>::new();
    let tray = app.tray_by_id(&tray_id_manager.id).unwrap();
    super::tray::update_tray(&config_manager, &mut data, &tray).await;

    Ok(())
}

pub fn generate_handler() -> impl Fn(Invoke) -> bool {
    generate_handler![get_config, set_config, update_tray, reset_config]
}
