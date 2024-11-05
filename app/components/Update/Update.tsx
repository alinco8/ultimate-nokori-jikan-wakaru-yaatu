import { Box, BoxProps, Card, Title } from '@mantine/core';
import { Markdown } from '~/components/Markdown';
import {} from '@tauri-apps/api/app';

export interface UpdateProps {
    version: string;
    description: string;
}

export const Update = (
    props: UpdateProps & BoxProps,
) => {
    const { version, description } = props;

    return (
        <Box {...props}>
            <Title>v{version}</Title>
            <Card withBorder p='lg' radius='md'>
                <Markdown content={description} />
            </Card>
        </Box>
    );
};
