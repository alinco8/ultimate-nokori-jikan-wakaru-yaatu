use chrono::Timelike;
use chrono_tz::Asia;
use std::sync::Mutex;

#[derive(serde::Deserialize, Clone, Debug)]
pub struct Schedule {
    pub name: String,
    pub time: [u8; 3],
}
impl Schedule {
    pub fn to_sec(&self) -> u32 {
        (self.time[0] as u32 * 3600) + (self.time[1] as u32 * 60) + (self.time[2] as u32)
    }
    pub fn to_string(&self) -> String {
        format!(
            "{:02}:{:02}:{:02}",
            self.time[0], self.time[1], self.time[2]
        )
    }
    pub fn get_remind_time(&self) -> u32 {
        let utc = chrono::Utc::now();
        let jst = utc.with_timezone(&Asia::Tokyo);
        let now_sec = jst.hour() * 3600 + jst.minute() * 60 + jst.second();

        self.to_sec() - now_sec
    }
}

pub enum ClosestMode {
    Before,
    After,
}

pub struct SchedulesManager {
    pub schedules: Mutex<Option<Vec<Schedule>>>,
}
impl SchedulesManager {
    pub fn new(schedules: Option<Vec<Schedule>>) -> Self {
        Self {
            schedules: Mutex::new(schedules),
        }
    }
}

pub fn get_closest(schedules: &Vec<Schedule>, mode: ClosestMode) -> Option<Schedule> {
    let utc = chrono::Utc::now();

    let jst = utc.with_timezone(&Asia::Tokyo);

    let now_sec = jst.hour() * 3600 + jst.minute() * 60 + jst.second();

    match mode {
        ClosestMode::Before => schedules
            .into_iter()
            .filter(|schedule| schedule.to_sec() < now_sec)
            .min_by_key(|schedule| now_sec - schedule.to_sec())
            .cloned(),
        ClosestMode::After => schedules
            .into_iter()
            .filter(|schedule| now_sec < schedule.to_sec())
            .min_by_key(|schedule| schedule.to_sec() - now_sec)
            .cloned(),
    }
}
