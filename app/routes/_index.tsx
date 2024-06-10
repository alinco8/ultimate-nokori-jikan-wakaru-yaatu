import type { MetaFunction } from '@remix-run/node';
import { useEffect, useRef } from 'react';
import { Main } from '~/components/Main';
import { checkUpdate } from '~/libs/update';

import { useTitleStore } from '~/store/titleStore';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix SPA' },
        { name: 'description', content: 'Welcome to Remix (SPA Mode)!' },
    ];
};

useTitleStore.getState().setTitle('設定');

export default function Index() {
    const refIntId = useRef(0);

    useEffect(() => {
        refIntId.current = window.setInterval(checkUpdate, 5000);

        return () => clearInterval(refIntId.current);
    }, []);

    return <Main />;
}
