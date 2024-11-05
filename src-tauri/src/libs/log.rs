use std::{fmt::Debug, ops::Deref};
use tokio::sync::Mutex;

#[derive(Debug)]
pub struct LogMutex<T: Debug> {
    inner: Mutex<T>,
}
impl<T: Debug> Deref for LogMutex<T> {
    type Target = Mutex<T>;
    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}
impl<T: Debug> Drop for LogMutex<T> {
    fn drop(&mut self) -> () {
        println!("Dropping Mutex {:?}", self);
    }
}
impl<T: Debug> LogMutex<T> {
    pub fn new(inner: T) -> Self {
        Self {
            inner: Mutex::new(inner),
        }
    }
}
