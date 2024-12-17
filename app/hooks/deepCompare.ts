import deepEqual from 'fast-deep-equal';
import { useRef } from 'react';

export function useDeepCompareMemorize(value: unknown) {
    const ref = useRef<unknown>();

    if (!deepEqual(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}
