import type { StoryObj } from '@storybook/react';
import { SettingGroup } from './SettingGroup';

export default {
    title: 'SettingGroup',
    component: SettingGroup,
};

type Story = StoryObj<typeof SettingGroup>;

export const Primary: Story = {
    args: {},
};
