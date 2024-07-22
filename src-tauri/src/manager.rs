use std::sync::MutexGuard;

pub trait ManagerWithLock<Value, InitialValue = Value> {
    fn new(initial_value: InitialValue) -> Self;
    fn lock(&self) -> MutexGuard<Value>;
}
