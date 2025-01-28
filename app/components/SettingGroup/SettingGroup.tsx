import { Box, Divider, Stack, Text, Title, TitleOrder } from '@mantine/core';

export interface SettingGroupProps {
    title: string;
    description?: string;
    order?: TitleOrder;
    children: React.ReactNode;
    disabled?: boolean;
    closable?: boolean;
}

export const SettingGroup = (
    { title, description, order = 2, children }: SettingGroupProps,
) => {
    return (
        <Box>
            <Title order={order}>{title}</Title>
            {description && (
                <Text size='sm' c='var(--mantine-color-dimmed)'>
                    {description}
                </Text>
            )}
            <Divider my='xs' />
            <Stack ml='sm'>
                {children}
            </Stack>
        </Box>
    );
};
