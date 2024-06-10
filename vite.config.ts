import { vitePlugin as remix } from '@remix-run/dev';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        remix({
            ssr: false,
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            ignored: ['**/src-tauri/**'],
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
        postcss: {
            plugins: [autoprefixer],
        },
    },
});
