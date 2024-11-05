use crate::libs::log::LogMutex;
use crate::libs::schedule::{ScheduleTime, Schedules};
use handlebars::{RenderError, RenderErrorReason};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::error::Error;
use std::time::Duration;
use std::{fs, ops::Deref, path::PathBuf};
use tauri::{AppHandle, Manager};
use tokio::sync::MutexGuard;
use tokio::time::timeout;

#[derive(Debug, Clone, Serialize, Deserialize)]
// #[ts(export, export_to = "greet.ts")]
pub struct AppConfig {
    #[serde(flatten, default)]
    pub schedules: Schedules,
    #[serde(default)]
    pub gas_url: Option<String>,
    #[serde(default)]
    pub formatter: HashMap<String, String>,
    #[serde(default)]
    pub current_formatter: String,
}
impl Default for AppConfig {
    fn default() -> Self {
        Self {
            schedules: Schedules::new(),
            gas_url: None,
            formatter: HashMap::from([
                (
                    "compact".to_string(),
                    "{{next.time}}| {{next.name}}".to_string(),
                ),
                (
                    "normal".to_string(),
                    "{{curr.time}}| {{curr.name}} => {{next.time}}| {{next.name}}".to_string(),
                ),
            ]),
            current_formatter: "normal".to_string(),
        }
    }
}

#[derive(Debug)]
pub struct ConfigManager<'a> {
    config: LogMutex<AppConfig>,
    pub config_path: PathBuf,
    handlebars: LogMutex<handlebars::Handlebars<'a>>,
}
impl<'a> ConfigManager<'a> {
    pub async fn new(app: AppHandle) -> Self {
        let config_dir = app.path().app_config_dir().unwrap();
        let config_path = config_dir.join("config.json");

        let config = if fs::exists(&config_path).unwrap() {
            serde_json::from_slice::<AppConfig>(&fs::read(&config_path).unwrap()).unwrap()
        } else {
            AppConfig::default()
        };
        fs::create_dir_all(&config_path.parent().unwrap()).unwrap();
        fs::write(&config_path, serde_json::to_vec(&config).unwrap()).unwrap();

        let mut hb = handlebars::Handlebars::new();

        hb.register_helper("remind_time", Box::new(remind_time_helper));

        for (name, formatter) in config.formatter.iter() {
            hb.register_template_string(&name, &formatter).unwrap();
        }

        Self {
            config: LogMutex::new(config),
            config_path,
            handlebars: LogMutex::new(hb),
        }
    }

    /// Drop config mutex before saving!!!
    pub async fn save(&self) -> () {
        fs::write(
            &self.config_path,
            serde_json::to_vec(&self.config.lock().await.deref()).unwrap(),
        )
        .unwrap();
    }
    pub async fn update_formatter(&self) -> Result<(), Box<dyn Error>> {
        {
            let config = self.config.lock().await;
            let mut hb = self.handlebars.lock().await;

            hb.clear_templates();
            for (name, formatter) in config.formatter.iter() {
                hb.register_template_string(&name, &formatter)?;
            }
        }

        self.save().await;

        Ok(())
    }

    pub async fn lock_config(&self) -> MutexGuard<'_, AppConfig> {
        println!("Locking config");
        let value = match timeout(Duration::from_secs(3), self.config.lock()).await {
            Ok(value) => value,
            Err(err) => panic!("{}", err),
        };
        println!("Locked config");

        value
    }
    pub async fn lock_handlebars(&self) -> MutexGuard<'_, handlebars::Handlebars<'a>> {
        println!("Locking handlebars");
        let value = match timeout(Duration::from_secs(3), self.handlebars.lock()).await {
            Ok(value) => value,
            Err(err) => panic!("{}", err),
        };
        println!("Locked handlebars");

        value
    }
}

pub fn remind_time_helper<'reg, 'rc>(
    h: &handlebars::Helper<'rc>,
    _r: &'reg handlebars::Handlebars<'reg>,
    _ctx: &'rc handlebars::Context,
    _rc: &mut handlebars::RenderContext<'reg, 'rc>,
    out: &mut dyn handlebars::Output,
) -> Result<(), RenderError> {
    let param = h
        .param(0)
        .ok_or(RenderErrorReason::ParamNotFoundForIndex("let", 2))?;

    println!("{:?}", param.value());

    let time = serde_json::from_value::<ScheduleTime>(param.value().clone())
        .map_err(|_| RenderErrorReason::InvalidParamType("ScheduleTime"))?;

    out.write(&time.remind_time().to_string())?;

    Ok(())
}

pub fn setup(app: &AppHandle) {
    println!("managing config manager");
    app.manage(ConfigManager::new(app.clone()));
    println!("manage config manager");
}
