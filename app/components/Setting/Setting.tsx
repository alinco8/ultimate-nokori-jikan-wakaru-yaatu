import { Stack } from '@mantine/core';

import { SettingButton } from '~/components/SettingButton';
import { SettingCheckbox } from '~/components/SettingCheckbox';
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
Setting.Checkbox = SettingCheckbox;
Setting.Group = SettingGroup;
Setting.Select = SettingSelect;
Setting.TextInput = SettingTextInput;
