import { Button, ButtonProps } from '@mantine/core';
import { SettingButtonModal } from '~/components/SettingButtonModal';
import { useConfigStore } from '~/stores/config';

export type SettingButtonProps = {
    disableWhenPending?: boolean;
} & ButtonProps;

export const SettingButton = (
    { disableWhenPending = true, ...buttonProps }: SettingButtonProps,
) => {
    const loading = useConfigStore(store => store.loading);

    return (
        <Button
            {...buttonProps}
            disabled={disableWhenPending && loading}
        />
    );
};

SettingButton.Modal = SettingButtonModal;
