mod features;
mod libs;

use features::commands;
use features::config::ConfigManager;
use log::trace;
use tauri::{generate_context, Manager};

pub fn run() {
    trace!("running tauri application");

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
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
        .invoke_handler(commands::generate_handler())
        .build(generate_context!())
        .expect("error while running tauri application")
        .run(|app, event| match event {
            tauri::RunEvent::ExitRequested { .. } => {
                println!("state from exit_requested");
                let _ = app.state::<ConfigManager>().save();
            }
            _ => (),
        });
}
