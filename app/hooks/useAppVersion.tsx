import { getVersion } from '@tauri-apps/api/app';
import { useEffect, useState } from 'react';

export const useAppVersion = () => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        void getVersion().then((version) => {
            setVersion(version);
        });
    }, []);

    return version;
};
