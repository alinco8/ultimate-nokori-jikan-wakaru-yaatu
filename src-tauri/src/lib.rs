mod features;
mod libs;

use features::{commands::generate_handler, config::ConfigManager};
use log::trace;
use tauri::Manager;

pub fn run() {
    trace!("running tauri application");

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .invoke_handler(generate_handler())
        .setup(|app| {
            let handle = app.handle();

            handle
                .get_webview_window("main")
                .unwrap()
                .on_window_event(|ev| match ev {
                    tauri::WindowEvent::CloseRequested { api, .. } => {
                        api.prevent_close();
                    }
                    _ => (),
                });

            features::setup(&handle);

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app, event| match event {
            tauri::RunEvent::ExitRequested { .. } => {
                let _ = app.state::<ConfigManager>().save();
            }
            _ => (),
        });
}
