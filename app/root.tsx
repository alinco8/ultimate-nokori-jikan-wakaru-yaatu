import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { LinksFunction } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import './App.scss';
import { ModalsProvider } from '@mantine/modals';

export const links: LinksFunction = () => [];

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
                <ColorSchemeScript />
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
