import { Select, SelectProps } from '@mantine/core';
import { useDisabled } from '~/contexts/disabled';

export type SettingSelectProps = {
    disableWhenPending?: boolean;
} & SelectProps;

export const SettingSelect = (
    { disableWhenPending = true, ...selectProps }: SettingSelectProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <Select
            {...selectProps}
            disabled={disableWhenPending && isDisabled}
        />
    );
};
