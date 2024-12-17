import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';

import '@mantine/core/styles.css';
import appScss from './App.scss?url';

export const links: Route.LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: appScss,
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
    const queryClient = new QueryClient();

    return (
        <MantineProvider defaultColorScheme='auto'>
            <ModalsProvider>
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}
