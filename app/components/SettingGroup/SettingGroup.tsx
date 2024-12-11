import {
    Accordion,
    Box,
    Divider,
    Stack,
    Text,
    Title,
    TitleOrder,
} from '@mantine/core';

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

export const SettingGroupClosable = (
    { title, description, order = 2, children }: SettingGroupProps,
) => {
    return (
        <Accordion>
            <Accordion.Item value='main'>
                <Accordion.Control>
                    <Title order={order}>{title}</Title>
                    {description && (
                        <Text size='sm' c='var(--mantine-color-dimmed)'>
                            {description}
                        </Text>
                    )}
                </Accordion.Control>
                <Accordion.Panel>
                    <Divider my='xs' />
                    <Stack ml='sm'>
                        {children}
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
};
