import type { StoryObj } from '@storybook/react';
import { WithHeader } from './Header';

export default {
    title: 'WithHeader',
    component: WithHeader,
};

type Story = StoryObj<typeof WithHeader>;

export const Primary: Story = {
    args: {
        children: <div>children</div>,
    },
};
