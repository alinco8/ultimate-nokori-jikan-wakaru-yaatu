import { Accordion, Title, TitleOrder } from '@mantine/core';

export interface SettingItemProps {
    title: string;
    order: TitleOrder;
    value: string;
    children?: React.ReactNode;
}

export const SettingItem = (
    { title, order, value, children }: SettingItemProps,
) => {
    return (
        <Accordion.Item value={value}>
            <Accordion.Control>
                <Title order={order}>{title}</Title>
            </Accordion.Control>
            <Accordion.Panel>
                {children}
            </Accordion.Panel>
        </Accordion.Item>
    );
};
