// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Decorator } from '@storybook/react';

export const decorators: Decorator[] = [
    (Story) => (
        <MantineProvider>
            <ModalsProvider>
                <Story />
            </ModalsProvider>
        </MantineProvider>
    ),
];
// export const parameters = { layout: 'fullscreen' };
