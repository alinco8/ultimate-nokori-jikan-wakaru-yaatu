import { app } from '@tauri-apps/api';
import { useEffect, useState } from 'react';

export const useAppVersion = () => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        void app.getVersion().then((version) => {
            setVersion(version);
        });
    }, []);

    return version;
};
