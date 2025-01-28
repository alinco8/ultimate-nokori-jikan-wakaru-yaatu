import { Select, SelectProps } from '@mantine/core';
import { useConfigStore } from '~/stores/config';

export type SettingSelectProps = {
    disableWhenPending?: boolean;
} & SelectProps;

export const SettingSelect = (
    { disableWhenPending = true, ...selectProps }: SettingSelectProps,
) => {
    const loading = useConfigStore(store => store.loading);

    return (
        <Select
            {...selectProps}
            disabled={disableWhenPending && loading}
        />
    );
};
