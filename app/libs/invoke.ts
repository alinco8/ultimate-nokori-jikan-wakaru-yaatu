import { invoke as rawInvoke } from '@tauri-apps/api/core';
import { Commands } from 'src-tauri/bindings/types';

export type Result<T, E> = { Ok: T } | { Err: E };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnwrapFunctionResult<T extends (...args: any) => any> =
    ReturnType<T> extends Result<infer U, unknown>
        ? (...args: Parameters<T>) => U
        : T;
export type OptionalArg<T> = T extends undefined ? [] : [T];

export async function invoke<
    T extends keyof Commands,
    Command extends UnwrapFunctionResult<Commands[T]>,
>(cmd: T, ...args: OptionalArg<Parameters<Command>[0]>) {
    return rawInvoke<ReturnType<Command>>(cmd, args[0]);
}
