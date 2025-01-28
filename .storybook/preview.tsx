import '@mantine/core/styles.css';

import { Decorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

export const decorators: Decorator[] = [
    (Story) => {
        return (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        );
    },
];
// export const parameters = { layout: 'fullscreen' };
