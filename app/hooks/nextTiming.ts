import { useEffect, useRef } from 'react';

export const useNextTiming = (
    callback: () => Promise<void>,
    deps: React.DependencyList,
) => {
    const refTimerId = useRef(0);
    const callbackFunc = async () => {
        await callback();

        refTimerId.current = window.setTimeout(callbackFunc, nextTiming());
    };

    useEffect(() => {
        refTimerId.current = window.setTimeout(callbackFunc, nextTiming());

        return () => {
            clearTimeout(refTimerId.current);
        };
    }, deps);
};

function nextTiming() {
    return 1000 - (Date.now() % 1000);
}
