import type { StoryObj } from '@storybook/react';
import { SettingsAdvanced } from './SettingsAdvanced';

export default {
    title: 'SettingsAdvanced',
    component: SettingsAdvanced,
};

type Story = StoryObj<typeof SettingsAdvanced>;

export const Primary: Story = {
    args: {},
};
