import { invoke as rawInvoke } from '@tauri-apps/api/core';

export async function invoke<T extends keyof Commands.Commands>(cmd: T, arg?: Record<string, unknown>) {
    return rawInvoke<ReturnType<Commands.Commands[T]>>(cmd, arg);
}
