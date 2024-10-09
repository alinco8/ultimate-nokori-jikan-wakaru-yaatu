use std::error::Error;
use tauri::AppHandle;
use tauri_plugin_updater::UpdaterExt;

pub fn setup(app: &AppHandle) -> Result<(), Box<dyn Error>> {
    app.plugin(tauri_plugin_updater::Builder::new().build())?;

    {
        let app = app.clone();
        tauri::async_runtime::spawn(async move {
            updater_thread(&app).await.unwrap();
        });
    }

    Ok(())
}

pub async fn updater_thread(app: &AppHandle) -> Result<(), Box<dyn Error>> {
    let updater = app.updater()?;

    {
        let update = updater.check().await?;

        if let Some(update) = update {
            // アップデート
        }
    };

    Ok(())
}
