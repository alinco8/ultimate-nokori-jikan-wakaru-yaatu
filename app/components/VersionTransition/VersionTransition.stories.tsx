import type { StoryObj } from '@storybook/react';
import { VersionTransition } from './VersionTransition';

export default {
    title: 'VersionTransition',
    component: VersionTransition,
};

type Story = StoryObj<typeof VersionTransition>;

export const Primary: Story = {
    args: {
        state: 1,
        from: [1, 0, 0],
        to: [1, 0, 1],
    },
};
