use super::config::ConfigManager;
use crate::libs::schedule::{ClosestScheduleMode, Schedule};
use chrono::Local;
use std::{collections::HashMap, time::Duration};
use tauri::{
    tray::{TrayIcon, TrayIconBuilder},
    AppHandle, Manager,
};
use tokio::time::sleep;

pub fn setup(app: &AppHandle) {
    let tray = TrayIconBuilder::new().build(app).unwrap();

    {
        let app = app.clone();
        tauri::async_runtime::spawn(async move {
            tray_thread(&app, &tray).await;
        });
    }
}
pub async fn tray_thread(app: &AppHandle, tray: &TrayIcon) {
    println!("state from tray_thread");
    let config_manager = app.state::<ConfigManager>();
    let mut data = HashMap::<&str, Option<Schedule>>::new();

    loop {
        {
            let config = config_manager.lock_config().await;
            let hb = config_manager.lock_handlebars().await;
            let schedules = &config.schedules;

            data.insert(
                "curr",
                schedules
                    .get_closest_schedule(ClosestScheduleMode::Current)
                    .await
                    .unwrap(),
            );
            data.insert(
                "next",
                schedules
                    .get_closest_schedule(ClosestScheduleMode::Next)
                    .await
                    .unwrap(),
            );

            match hb.render(&config.current_formatter, &data) {
                Ok(title) => {
                    tray.set_title(Some(title)).unwrap();
                }
                Err(err) => {
                    println!("{}", err);
                }
            }
        }

        wait_next_second().await;
    }
}

async fn wait_next_second() {
    let time = Local::now();
    sleep(Duration::from_millis(
        (1000u32 - time.timestamp_subsec_millis()).into(),
    ))
    .await;
}
