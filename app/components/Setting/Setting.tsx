import { Checkbox, Stack } from '@mantine/core';

import { SettingButton } from '~/components/SettingButton';
import { SettingGroup } from '~/components/SettingGroup';
import { SettingsAdvanced } from '~/components/SettingsAdvanced';
import { SettingsBasic } from '~/components/SettingsBasic';
import { SettingSelect } from '~/components/SettingSelect';
import { SettingTextInput } from '~/components/SettingTextInput';

export const Setting = () => {
    return (
        <Stack>
            <SettingsBasic />
            <SettingsAdvanced />
        </Stack>
    );
};

Setting.Button = SettingButton;
Setting.Checkbox = Checkbox;
Setting.Group = SettingGroup;
Setting.Select = SettingSelect;
Setting.TextInput = SettingTextInput;
