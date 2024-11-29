use super::config::ConfigManager;
use crate::libs::schedule::{ClosestScheduleMode, Schedule};
use chrono::Local;
use log::error;
use std::{collections::HashMap, time::Duration};
use tauri::{
    menu::MenuBuilder,
    tray::{TrayIcon, TrayIconBuilder, TrayIconId},
    ActivationPolicy, AppHandle, Manager, State,
};
use tokio::time::sleep;

#[derive(Debug)]
pub struct TrayIdManager {
    pub id: TrayIconId,
}

pub fn setup(app: &AppHandle) {
    let menu = MenuBuilder::new(app)
        .text("show", "アプリを表示")
        .separator()
        .quit_with_text("終了")
        .build()
        .unwrap();
    let tray = TrayIconBuilder::new().menu(&menu).build(app).unwrap();

    app.on_menu_event(|app, event| {
        if event.id == "show" {
            let main = app.get_webview_window("main").unwrap();
            main.show().unwrap();
            main.set_focus().unwrap();

            app.set_activation_policy(ActivationPolicy::Regular)
                .unwrap();
        }
    });

    app.manage(TrayIdManager {
        id: tray.id().clone(),
    });

    {
        let app = app.clone();
        tauri::async_runtime::spawn(async move {
            tray_thread(&app).await;
        });
    }
}
pub async fn tray_thread(app: &AppHandle) {
    let config_manager = app.state::<ConfigManager>();
    let tray_id_manager = app.state::<TrayIdManager>();
    let mut data = HashMap::<&str, Option<Schedule>>::new();

    let tray = app.tray_by_id(&tray_id_manager.id).unwrap();

    loop {
        update_tray(&config_manager, &mut data, &tray).await;

        wait_next_second().await;
    }
}

pub async fn update_tray(
    config_manager: &State<'_, ConfigManager<'_>>,
    data: &mut HashMap<&str, Option<Schedule>>,
    tray: &TrayIcon,
) {
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
            error!("{}", err);
            tray.set_title(Some("Error")).unwrap();
        }
    }
}

async fn wait_next_second() {
    let time = Local::now();
    sleep(Duration::from_millis(
        (1000u32 - time.timestamp_subsec_millis()).into(),
    ))
    .await;
}
