import { Button, ButtonProps } from '@mantine/core';
import { useDisabled } from '~/contexts/disabled';

export type SettingButtonProps = {
    disableWhenPending?: boolean;
} & ButtonProps;

export const SettingButton = (
    { disableWhenPending = true, ...buttonProps }: SettingButtonProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <Button
            {...buttonProps}
            disabled={disableWhenPending && isDisabled}
        />
    );
};
