import type { StoryObj } from '@storybook/react';
import { SettingsBasic } from './SettingsBasic';

export default {
    title: 'SettingsBasic',
    component: SettingsBasic,
};

type Story = StoryObj<typeof SettingsBasic>;

export const Primary: Story = {
    args: {},
};
