import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { useEffect, useRef } from 'react';

export function useListen(...args: Parameters<typeof listen>) {
    const refListen = useRef<Promise<UnlistenFn> | null>(null);

    useEffect(() => {
        refListen.current = listen(...args);

        return () => {
            refListen.current?.then((unlisten) => unlisten());
        };
    }, []);
}
