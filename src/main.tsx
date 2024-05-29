import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './_App';
import { Fonts, theme } from './theme';

if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', console.clear);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Fonts />
            <App />
            <CSSReset />
        </ChakraProvider>
    </React.StrictMode>,
);
