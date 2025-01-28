import { TextInput, TextInputProps } from '@mantine/core';
import { useValidatedState } from '@mantine/hooks';
import { useConfigStore } from '~/stores/config';

export type SettingTextInputProps = {
    disableWhenPending?: boolean;
    validator?: (s: string) => boolean;
    onValidValue?: (s: string) => void;
} & TextInputProps;

export const SettingTextInput = (
    {
        disableWhenPending = true,
        validator,
        defaultValue,
        onValidValue,
        ...textInputProps
    }: SettingTextInputProps,
) => {
    const loading = useConfigStore(store => store.loading);
    const [{
        value,
        lastValidValue,
        valid,
    }, setValue] = useValidatedState(
        defaultValue?.toString() ?? '',
        validator ?? (() => true),
    );

    return (
        <>
            <TextInput
                {...textInputProps}
                error={!valid}
                value={value}
                disabled={disableWhenPending && loading}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                    textInputProps.onChange?.(e);
                }}
                onBlur={(e) => {
                    if (valid) {
                        onValidValue?.(value);
                    } else if (lastValidValue !== undefined) {
                        onValidValue?.(lastValidValue);
                        setValue(lastValidValue);
                    }
                    textInputProps.onBlur?.(e);
                }}
            />
        </>
    );
};
