import deepEqual from 'fast-deep-equal';
import { useRef, useState } from 'react';

export const useCheckedState = <T>(
    init: T | (() => T),
    check: (a: T, b: T) => boolean = deepEqual,
): [T, (newState: T) => void] => {
    const [state, setState] = useState<T>(init);
    const lastState = useRef<T>(
        typeof init === 'function' ? (init as () => T)() : init,
    );
    const setCheckedState = (newState: T) => {
        if (check(lastState.current, newState)) {
            lastState.current = newState;
            setState(newState);
        }
    };

    return [state, setCheckedState];
};
