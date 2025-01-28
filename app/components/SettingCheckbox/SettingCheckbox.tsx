import { Checkbox, CheckboxProps } from '@mantine/core';
import { useConfigStore } from '~/stores/config';

export type SettingCheckboxProps = {
    disableWhenPending?: boolean;
} & CheckboxProps;

export const SettingCheckbox = (
    { disableWhenPending = true, ...checkboxProps }: SettingCheckboxProps,
) => {
    const loading = useConfigStore(store => store.loading);

    return (
        <Checkbox
            disabled={disableWhenPending && loading}
            {...checkboxProps}
        />
    );
};
