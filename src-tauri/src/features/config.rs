use crate::libs::schedule::Schedules;
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use std::{fs, ops::Deref, path::PathBuf};
use tauri::{AppHandle, Manager, Url};
use tokio::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Formatter {
    compact: String,
    normal: String,
}
impl Default for Formatter {
    fn default() -> Self {
        Self {
            compact: "{{next.time}}| {{next.name}}".to_string(),
            normal: "{{curr.time}}| {{curr.name}} => {{next.time}}| {{next.name}}".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ScheduleMode {
    Compact,
    Normal,
}
impl Default for ScheduleMode {
    fn default() -> Self {
        ScheduleMode::Normal
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    #[serde(flatten, default)]
    pub schedules: Schedules,
    #[serde(default)]
    pub mode: ScheduleMode,
    #[serde(default)]
    pub gas_url: Option<Url>,
    #[serde(default)]
    pub formatter: Option<PathBuf>,
}
impl Default for AppConfig {
    fn default() -> Self {
        Self {
            schedules: Schedules::new(),
            mode: ScheduleMode::Normal,
            gas_url: None,
            formatter: Default::default(),
        }
    }
}

pub struct ConfigManager {
    pub config: Mutex<AppConfig>,
    pub config_path: PathBuf,
    pub app: AppHandle,
}
impl ConfigManager {
    pub fn new(app: AppHandle) -> Self {
        let config_dir = app.path().app_config_dir().unwrap();
        let config_path = config_dir.join("config.json");

        let config = if fs::exists(&config_path).unwrap() {
            serde_json::from_slice::<AppConfig>(&fs::read(&config_path).unwrap()).unwrap()
        } else {
            AppConfig::default()
        };
        fs::create_dir_all(&config_path.parent().unwrap()).unwrap();
        fs::write(&config_path, serde_json::to_vec(&config).unwrap()).unwrap();

        Self {
            config: Mutex::new(config),
            config_path,
            app,
        }
    }

    pub async fn save(&self) -> () {
        fs::write(
            &self.config_path,
            serde_json::to_vec(&self.config.lock().await.deref()).unwrap(),
        )
        .unwrap();
    }
}

pub fn setup(app: &AppHandle) {
    app.manage(ConfigManager::new(app.clone()));
}
