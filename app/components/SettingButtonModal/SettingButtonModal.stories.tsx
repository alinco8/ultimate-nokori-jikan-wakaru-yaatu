import type { StoryObj } from '@storybook/react';
import { SettingButtonModal } from './SettingButtonModal';

export default {
    title: 'SettingButtonModal',
    component: SettingButtonModal,
};

type Story = StoryObj<typeof SettingButtonModal>;

export const Primary: Story = {
    args: {},
};
