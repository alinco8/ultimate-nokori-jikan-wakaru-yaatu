import { Stack } from '@mantine/core';

export interface SettingProps {
    children: React.ReactNode;
}
export const Setting = (
    { children }: SettingProps,
) => {
    return (
        <Stack>
            {children}
        </Stack>
    );
};
