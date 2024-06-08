import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { Header } from '~/components/Header';
import theme, { Fonts } from '~/theme';

export function Layout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
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
    return (
        <ChakraProvider theme={theme}>
            <Header />
            <Outlet />
            <CSSReset />
            <Fonts />
        </ChakraProvider>
    );
}

// export function ErrorBoundary() {
//     const error = useRouteError();
//     console.log('ROUTE ERROR');

//     return (
//         <>
//             <Header />
//             <CSSReset />

//             <Heading size={'4xl'}>
//                 {isRouteErrorResponse(error)
//                     ? `${error.status} ${error.statusText}`
//                     : error instanceof Error
//                       ? error.message
//                       : 'Unknown Error'}
//             </Heading>
//         </>
//     );
// }
