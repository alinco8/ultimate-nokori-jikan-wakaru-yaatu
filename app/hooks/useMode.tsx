import { useEffect, useState } from 'react';
import {} from '@tauri-apps/api';

export const useMode = () => {
    const [mode, setMode] = useState<'dark' | 'light'>('light');

    useEffect(() => {}, []);

    return mode;
};
