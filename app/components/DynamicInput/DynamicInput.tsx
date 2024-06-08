import { Container, Flex } from '@chakra-ui/react';
import { DynamicInputInput } from '~/components/DynamicInputInput';
import { DynamicInputPlaceholder } from '~/components/DynamicInputPlaceholder';

export const DynamicInput = () => {
    return (
        <Container>
            <Flex
                alignItems="center"
                justifyContent="flex-start"
                style={{ border: '1px solid #000' }}
            >
                <DynamicInputInput />
                <DynamicInputPlaceholder text="現在の予定" color="#86e5ff" />
                <DynamicInputInput />
            </Flex>
        </Container>
    );
};
