use log::{error, info};
use std::{path::Path, time::Duration};
use tauri::{AppHandle, Listener, Manager, WebviewWindow, WebviewWindowBuilder};
use tauri_plugin_updater::UpdaterExt;
use tokio::time::sleep;

#[derive(Debug, serde::Deserialize)]
struct Payload {
    wait: u64,
}

pub fn setup(app: &AppHandle) {
    info!("Setting up updater plugin");
    app.plugin(tauri_plugin_updater::Builder::new().build())
        .unwrap();

    {
        let app = app.clone();
        tauri::async_runtime::spawn(async move {
            info!("Spawning updater thread");
            updater_thread(&app).await;
        });
    }
}

pub async fn updater_thread(app: &AppHandle) {
    let updater = app.updater().unwrap();

    loop {
        info!("Checking for updates");
        let update = match updater.check().await {
            Ok(update) => update,
            Err(e) => {
                error!("Failed to check for updates: {:?}", e);
                continue;
            }
        };

        if let Some(update) = update {
            let curr = app.package_info().version.to_string();
            let update = update.version;

            info!(
                "Update available: current version: {}, new version: {}",
                curr, update
            );
            let payload = show_update(&app, &curr, &update).await;

            info!("Waiting for {} seconds before next check", payload.wait);
            sleep(Duration::from_secs(payload.wait)).await;
        } else {
            info!("No update available");
        }

        info!("Waiting for 10 seconds before next check");
        sleep(Duration::from_secs(10)).await;
    }
}

async fn show_update(app: &AppHandle, curr: &str, next: &str) -> Payload {
    info!(
        "Showing update window: current version: {}, next version: {}",
        curr, next
    );
    let window = show_update_window(app, curr, next);
    let (s, r) = tokio::sync::oneshot::channel::<Payload>();

    {
        let app = app.clone();

        window.once("close-update-page", move |e| {
            info!("Update window closed");
            hide_update_window(&app);

            match serde_json::from_str::<Payload>(e.payload()) {
                Ok(payload) => {
                    s.send(payload).unwrap();
                }
                Err(e) => {
                    error!("Failed to deserialize payload: {:?}", e);
                }
            }
        });
    }

    r.await.unwrap()
}

fn show_update_window(app: &AppHandle, curr: &str, next: &str) -> WebviewWindow {
    info!("Creating update window");
    let update_window = WebviewWindowBuilder::new(
        app,
        "update",
        tauri::WebviewUrl::App(
            Path::new(&format!("/update?current={}&next={}", curr, next)).to_path_buf(),
        ),
    )
    .accept_first_mouse(true)
    .title("アップデート")
    .min_inner_size(800., 600.)
    .visible_on_all_workspaces(true)
    .decorations(false)
    .always_on_top(true)
    .closable(false)
    .build()
    .unwrap();

    update_window
}

fn hide_update_window(app: &AppHandle) {
    info!("Hiding update window");
    let window = app.get_webview_window("update").unwrap();

    window.destroy().unwrap();
}
