use super::config::{ConfigManager, ScheduleMode};
use crate::libs::schedule::ClosestScheduleMode;
use chrono::Local;
use std::time::Duration;
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
    let schedules_manager = app.state::<ConfigManager>();

    loop {
        let config = schedules_manager.config.lock().await;
        let schedules = &config.schedules;

        tray.set_title(Some(match config.mode {
            ScheduleMode::Compact => {
                match (
                    schedules
                        .get_closest_schedule(ClosestScheduleMode::Current)
                        .await
                        .map_err(|err| err.to_string())
                        .unwrap(),
                    schedules
                        .get_closest_schedule(ClosestScheduleMode::Next)
                        .await
                        .map_err(|err| err.to_string())
                        .unwrap(),
                ) {
                    (None, None) => format!("(´-﹃-`)"),
                    (Some(curr), None) => format!("{}| _(:3」∠)_", curr.name),
                    (None, Some(next)) | (Some(_), Some(next)) => {
                        format!("{}| {}", next.time.remind_time(), next.name)
                    }
                }
            }
            ScheduleMode::Normal => {
                match (
                    schedules
                        .get_closest_schedule(ClosestScheduleMode::Current)
                        .await
                        .map_err(|err| err.to_string())
                        .unwrap(),
                    schedules
                        .get_closest_schedule(ClosestScheduleMode::Next)
                        .await
                        .map_err(|err| err.to_string())
                        .unwrap(),
                ) {
                    (None, None) => format!("(´-﹃-`)"),
                    (None, Some(next)) => format!("=> {} {}", next.time.remind_time(), next.name),
                    (Some(curr), None) => format!("{} {} => _(:3」∠)_", curr.time, curr.name),
                    (Some(curr), Some(next)) => format!(
                        "{} {} => {} {}",
                        curr.time,
                        curr.name,
                        next.time.remind_time(),
                        next.name
                    ),
                }
            }
        }))
        .unwrap();

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
