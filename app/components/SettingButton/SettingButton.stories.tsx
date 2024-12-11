import type { StoryObj } from '@storybook/react';
import { SettingButton } from './SettingButton';

export default {
    title: 'SettingButton',
    component: SettingButton,
};

type Story = StoryObj<typeof SettingButton>;

export const Primary: Story = {
    args: {},
};
