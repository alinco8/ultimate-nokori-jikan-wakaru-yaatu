import type { StoryObj } from '@storybook/react';
import { SettingCheckbox } from './SettingCheckbox';

export default {
    title: 'SettingCheckbox',
    component: SettingCheckbox,
};

type Story = StoryObj<typeof SettingCheckbox>;

export const Primary: Story = {
    args: {},
};
