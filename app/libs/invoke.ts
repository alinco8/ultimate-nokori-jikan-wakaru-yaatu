import { invoke as rawInvoke } from '@tauri-apps/api/core';
import { Commands } from '~/commands';

export async function invoke<T extends keyof Commands.Commands>(cmd: T, arg?: Parameters<Commands.Commands[T]>[0]) {
    return rawInvoke<ReturnType<Commands.Commands[T]>>(cmd, arg);
}
