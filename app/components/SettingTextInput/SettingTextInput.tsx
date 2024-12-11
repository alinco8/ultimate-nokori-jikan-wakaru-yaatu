import { TextInput, TextInputProps } from '@mantine/core';
import { useDisabled } from '~/contexts/disabled';

export type SettingTextInputProps = {
    disableWhenPending?: boolean;
} & TextInputProps;

export const SettingTextInput = (
    { disableWhenPending = true, ...textInputProps }: SettingTextInputProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <TextInput
            {...textInputProps}
            disabled={disableWhenPending && isDisabled}
        />
    );
};
