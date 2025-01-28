import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
    PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';

import mantineHighlightCss from '@mantine/code-highlight/styles.css?url';
import mantineCss from '@mantine/core/styles.css?url';
import { useEffect, useRef } from 'react';
import { invoke } from '~/libs/invoke';
import { useConfigStore } from '~/stores/config';
import appScss from './App.scss?url';

export const links: Route.LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: appScss,
    },
    {
        rel: 'stylesheet',
        href: mantineCss,
    },
    {
        rel: 'stylesheet',
        href: mantineHighlightCss,
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ja'>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const query = useRef({
        client: new QueryClient({
            defaultOptions: {
                queries: {
                    gcTime: 1000 * 60 * 60,
                    staleTime: 1000 * 60 * 60,
                },
            },
        }),
        persister: createSyncStoragePersister({
            storage: window.localStorage,
        }),
    });

    useEffect(() => {
        invoke('get_config').then(config => {
            useConfigStore.getState().setConfig(async () => config);
        });
    }, []);

    return (
        <MantineProvider defaultColorScheme='auto'>
            <ModalsProvider>
                <PersistQueryClientProvider
                    client={query.current.client}
                    persistOptions={{ persister: query.current.persister }}
                >
                    <Outlet />
                </PersistQueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}
