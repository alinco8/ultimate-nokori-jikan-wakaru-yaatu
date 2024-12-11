import { Checkbox, TextInput } from '@mantine/core';
import type { StoryObj } from '@storybook/react';
import { SettingGroup } from '~/components/SettingGroup';
import { Setting } from './Setting';

export default {
    title: 'Setting',
    component: Setting,
};

type Story = StoryObj<typeof Setting>;

export const Primary: Story = {
    args: {
        children: (
            <>
                <SettingGroup title='基本設定'>
                    <Checkbox label='Label' description='Description' />
                    <TextInput label='Label' description='Description' />
                </SettingGroup>
                <SettingGroup title='高度な設定'>
                    2
                </SettingGroup>
            </>
        ),
    },
};
