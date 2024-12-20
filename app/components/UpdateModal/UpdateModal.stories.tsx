import type { StoryObj } from '@storybook/react';
import { UpdateModal } from './UpdateModal';

export default {
    title: 'UpdateModal',
    component: UpdateModal,
};

type Story = StoryObj<typeof UpdateModal>;

export const Primary: Story = {
    args: {},
};
