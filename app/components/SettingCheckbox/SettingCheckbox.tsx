import { Checkbox, CheckboxProps } from '@mantine/core';
import { useDisabled } from '~/contexts/disabled';

export type SettingCheckboxProps = {
    disableWhenPending?: boolean;
} & CheckboxProps;

export const SettingCheckbox = (
    { disableWhenPending = true, ...checkboxProps }: SettingCheckboxProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <Checkbox
            {...checkboxProps}
            disabled={disableWhenPending && isDisabled}
        />
    );
};
