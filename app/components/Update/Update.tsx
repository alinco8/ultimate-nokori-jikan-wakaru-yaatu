import { Box, BoxProps, Card, Title } from '@mantine/core';
import { Markdown } from '~/components/Markdown';

export interface UpdateProps {
    version: string;
    description: string;
}

export const Update = (
    { version, description, ...props }: UpdateProps & BoxProps,
) => {
    return (
        <Box {...props}>
            <Title>v{version}</Title>
            <Card withBorder p='lg' radius='md'>
                <Markdown content={description} />
            </Card>
        </Box>
    );
};
