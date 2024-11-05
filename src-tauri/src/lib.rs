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

            {
                let handle = handle.clone();
                handle
                    .get_webview_window("main")
                    .unwrap()
                    .on_window_event(move |ev| match ev {
                        tauri::WindowEvent::CloseRequested { api, .. } => {
                            api.prevent_close();

                            handle.get_webview_window("main").unwrap().hide().unwrap();
                        }
                        _ => (),
                    });
            }

            features::setup(&handle);

            Ok(())
        })
        .invoke_handler(commands::generate_handler())
        .build(generate_context!())
        .expect("error while running tauri application")
        .run(|app, event| match event {
            tauri::RunEvent::ExitRequested { .. } => {
                println!("exit requested");
                let _ = app.state::<ConfigManager>().save();
            }
            tauri::RunEvent::Reopen {
                has_visible_windows,
                ..
            } => {
                if !has_visible_windows {
                    app.get_webview_window("main").unwrap().show().unwrap();
                }
            }
            _ => (),
        });
}
