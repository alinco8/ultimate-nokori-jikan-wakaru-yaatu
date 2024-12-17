import type { StoryObj } from '@storybook/react';
import { Diary } from './Diary';

export default {
    title: 'Diary',
    component: Diary,
};

type Story = StoryObj<typeof Diary>;

export const Primary: Story = {
    args: {},
};
