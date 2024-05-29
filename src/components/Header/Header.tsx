import { Box, Text } from '@chakra-ui/react';
import { useTitleStore } from '../../store/title';

export const Header = () => {
    const title = useTitleStore((store) => store.title);

    return (
        <Box
            style={{
                height: '30px',
                background: '#eee',
                textAlign: 'center',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                cursor: 'default',
            }}
        >
            <Text>{title}</Text>
        </Box>
    );
};
