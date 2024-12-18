import { Route } from '.react-router/types/app/+types/root';
import {
    Autocomplete,
    Card,
    Container,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const meta: Route.MetaFunction = () => [
    {
        title: '日誌',
    },
    {
        name: 'description',
        content: 'ヘルプ',
    },
];

const helps: { title: string; content: string }[] = [];

export default function Help() {
    return (
        <Container pt='lg'>
            <Autocomplete variant='filled' leftSection={<IconSearch />} />
            <Stack mt='md'>
                {helps.map((help, index) => (
                    <Card key={index} shadow='xs' padding='md'>
                        <Title order={3}>{help.title}</Title>
                        <Text>{help.content}</Text>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}
