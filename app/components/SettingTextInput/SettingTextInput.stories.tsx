import type { StoryObj } from '@storybook/react';
import { SettingTextInput } from './SettingTextInput';

export default {
    title: 'SettingInput',
    component: SettingTextInput,
};

type Story = StoryObj<typeof SettingTextInput>;

export const Primary: Story = {
    args: {},
};
