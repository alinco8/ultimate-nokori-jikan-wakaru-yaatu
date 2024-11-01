use tokio::sync::MutexGuard;

pub trait ManagerWithLock<'a, Value: 'a> {
    fn new(initial_value: Value) -> Self;
    async fn lock(&'a self) -> MutexGuard<'a, Value>;
}
