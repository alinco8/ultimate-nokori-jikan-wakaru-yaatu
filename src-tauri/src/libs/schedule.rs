use chrono::{Local, Timelike};
use serde::{de::Visitor, Deserialize, Serialize};
use std::{
    collections::BTreeSet,
    error::Error,
    fmt::{Debug, Display},
};
use ts_rs::TS;

#[derive(Debug, Clone, Deserialize, Serialize, TS)]
pub struct Schedules {
    schedules: BTreeSet<Schedule>,
}

impl Schedules {
    pub async fn get_closest_schedule(
        &self,
        mode: ClosestScheduleMode,
    ) -> Result<Option<Schedule>, Box<dyn Error>> {
        let schedules = &self.schedules;

        let time = {
            let now = Local::now();

            ScheduleTime::new(Some(now.hour()), now.minute(), now.second())
        };

        Ok(match mode {
            ClosestScheduleMode::Current => schedules
                .range(
                    ..Schedule {
                        name: String::new(),
                        time,
                    },
                )
                .next_back()
                .cloned(),
            ClosestScheduleMode::Next => schedules
                .range(
                    Schedule {
                        name: String::new(),
                        time,
                    }..,
                )
                .next()
                .cloned(),
        })
    }
}
impl Default for Schedules {
    fn default() -> Self {
        Self {
            schedules: BTreeSet::from([
                Schedule {
                    name: "朝礼".to_string(),
                    time: ScheduleTime::new(Some(09), 31, 00),
                },
                Schedule {
                    name: "1限目".to_string(),
                    time: ScheduleTime::new(Some(09), 45, 00),
                },
                Schedule {
                    name: "休憩1".to_string(),
                    time: ScheduleTime::new(Some(10), 35, 00),
                },
                Schedule {
                    name: "2限目".to_string(),
                    time: ScheduleTime::new(Some(10), 45, 00),
                },
                Schedule {
                    name: "休憩2".to_string(),
                    time: ScheduleTime::new(Some(11), 35, 00),
                },
                Schedule {
                    name: "3限目".to_string(),
                    time: ScheduleTime::new(Some(11), 45, 00),
                },
                Schedule {
                    name: "昼休憩".to_string(),
                    time: ScheduleTime::new(Some(12), 35, 00),
                },
                Schedule {
                    name: "4限目".to_string(),
                    time: ScheduleTime::new(Some(13), 15, 00),
                },
                Schedule {
                    name: "休憩4".to_string(),
                    time: ScheduleTime::new(Some(14), 05, 00),
                },
                Schedule {
                    name: "5限目".to_string(),
                    time: ScheduleTime::new(Some(14), 15, 00),
                },
                Schedule {
                    name: "休憩5".to_string(),
                    time: ScheduleTime::new(Some(15), 05, 00),
                },
                Schedule {
                    name: "6限目".to_string(),
                    time: ScheduleTime::new(Some(15), 15, 00),
                },
                Schedule {
                    name: "終礼".to_string(),
                    time: ScheduleTime::new(Some(16), 05, 00),
                },
                Schedule {
                    name: "放課後".to_string(),
                    time: ScheduleTime::new(Some(16), 15, 00),
                },
            ]),
        }
    }
}

pub enum ClosestScheduleMode {
    Current,
    Next,
}

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize, TS)]
#[ts(export, export_to = "type.d.ts")]
pub struct Schedule {
    pub name: String,
    pub time: ScheduleTime,
}
impl PartialOrd for Schedule {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        match self.time.partial_cmp(&other.time) {
            Some(core::cmp::Ordering::Equal) => {}
            ord => return ord,
        }
        self.name.partial_cmp(&other.name)
    }
}
impl Ord for Schedule {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        match self.time.cmp(&other.time) {
            std::cmp::Ordering::Equal => {}
            ord => return ord,
        }
        self.name.cmp(&other.name)
    }
}
impl Display for Schedule {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.name)
    }
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, TS)]
#[ts(export, export_to = "type.d.ts")]
pub struct ScheduleTime {
    pub hour: Option<u32>,
    pub minute: u32,
    pub second: u32,
}
impl Serialize for ScheduleTime {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&format!("{}", self))
    }
}
impl Display for ScheduleTime {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self.hour {
            Some(hour) => write!(f, "{:0>2}:{:0>2}:{:0>2}", hour, self.minute, self.second),
            None => write!(f, "{:0>2}:{:0>2}", self.minute, self.second),
        }
    }
}
impl ScheduleTime {
    pub fn new(hour: Option<u32>, minute: u32, second: u32) -> Self {
        Self {
            hour,
            minute,
            second,
        }
    }
    pub fn remind_time(&self) -> ScheduleTime {
        let self_seconds = self.hour.unwrap_or(0) * 3600 + self.minute * 60 + self.second;

        let now = Local::now();
        let now_seconds = now.hour() * 3600 + now.minute() * 60 + now.second();

        let remind_seconds = self_seconds.checked_sub(now_seconds).unwrap_or(0);

        ScheduleTime {
            hour: None,
            minute: remind_seconds / 60,
            second: remind_seconds % 60,
        }
    }
}
impl<'de> Deserialize<'de> for ScheduleTime {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_str(ScheduleTimeVisitor)
    }
}
pub struct ScheduleTimeVisitor;
impl<'de> Visitor<'de> for ScheduleTimeVisitor {
    type Value = ScheduleTime;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a string in the format of HH:MM:SS or MM:SS")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let s = v.split(":").collect::<Vec<&str>>();

        Ok(ScheduleTime::new(
            Some(s[0].parse::<u32>().unwrap()),
            s[1].parse::<u32>().unwrap(),
            s[2].parse::<u32>().unwrap(),
        ))
    }
}
