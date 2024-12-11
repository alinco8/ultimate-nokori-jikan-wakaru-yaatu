import type { StoryObj } from '@storybook/react';
import { SettingSelect } from './SettingSelect';

export default {
    title: 'SettingSelect',
    component: SettingSelect,
};

type Story = StoryObj<typeof SettingSelect>;

export const Primary: Story = {
    args: {},
};
