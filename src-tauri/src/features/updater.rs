use std::{path::Path, time::Duration};
use tauri::{AppHandle, Listener, Manager, WebviewWindow, WebviewWindowBuilder};
use tauri_plugin_updater::UpdaterExt;
use tokio::time::sleep;

#[derive(Debug, serde::Deserialize)]
struct Payload {
    wait: u64,
}

pub fn setup(app: &AppHandle) {
    app.plugin(tauri_plugin_updater::Builder::new().build())
        .unwrap();

    {
        let app = app.clone();
        tauri::async_runtime::spawn(async move {
            updater_thread(&app).await;
        });
    }
}

pub async fn updater_thread(app: &AppHandle) {
    let updater = app.updater().unwrap();

    loop {
        let update = updater.check().await.unwrap();

        if let Some(update) = update {
            println!(
                "Update available: {} => {}",
                app.package_info().version.to_string(),
                update.version,
            );

            let payload = show_update(&app).await;

            sleep(Duration::from_secs(payload.wait)).await;
        } else {
            println!("No update available");
        }

        sleep(Duration::from_secs(10)).await;
    }
}

async fn show_update(app: &AppHandle) -> Payload {
    let window = show_update_window(app);
    let (s, r) = tokio::sync::oneshot::channel::<Payload>();

    {
        let app = app.clone();

        window.once("close-update-page", move |e| {
            hide_update_window(&app);

            s.send(serde_json::from_str::<Payload>(e.payload()).unwrap())
                .unwrap();
        });
    }

    r.await.unwrap()
}

fn show_update_window(app: &AppHandle) -> WebviewWindow {
    let update_window = WebviewWindowBuilder::new(
        app,
        "update",
        tauri::WebviewUrl::App(Path::new("/update").to_path_buf()),
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
    let window = app.get_webview_window("update").unwrap();

    window.destroy().unwrap();
}
