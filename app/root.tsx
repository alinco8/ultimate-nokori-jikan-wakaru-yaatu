import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { LinksFunction } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';

import '@mantine/core/styles.css';
import './App.scss';

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
                <MantineProvider defaultColorScheme='auto'>
                    {children}
                </MantineProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
