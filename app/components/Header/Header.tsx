import { Box, Flex, Text } from '@chakra-ui/react';
import { TauriDragRegion } from '~/components/TauriDragRegion';
import { useTitleStore } from '~/store/titleStore';

export const Header = () => {
    const title = useTitleStore((store) => store.title);

    return (
        <TauriDragRegion>
            {(refParent) => (
                <Box
                    height="35px"
                    bgColor="teal"
                    color="white"
                    style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        cursor: 'default',
                    }}
                    ref={refParent}
                >
                    <Flex
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text>{title}</Text>
                    </Flex>
                </Box>
            )}
        </TauriDragRegion>
    );
};
