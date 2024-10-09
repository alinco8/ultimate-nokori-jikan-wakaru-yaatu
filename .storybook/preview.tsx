// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '../app/styles.css';

import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import { addons } from '@storybook/preview-api';
import { useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

function ColorSchemeWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setColorScheme } = useMantineColorScheme();
    const handleColorScheme = (value: boolean) => {
        setColorScheme(value ? 'dark' : 'light');
    };

    useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
        return () => {
            channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
        };
    }, [channel]);

    return <>{children}</>;
}

export const decorators = [
    (renderStory: () => React.ReactNode) => (
        <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
    ),
    (renderStory: () => React.ReactNode) => (
        <MantineProvider>{renderStory()}</MantineProvider>
    ),
];
export const parameters = { layout: 'fullscreen' };
