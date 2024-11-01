import {
    Button,
    Center,
    Flex,
    Loader,
    Modal,
    Progress,
    Text,
} from '@mantine/core';

export type UpdateModalState = {
    state: 'CheckingUpdate';
} | {
    state: 'Updating';
    value: number;
    max: number;
} | {
    state: 'ConfirmRelaunch';
};

export interface UpdateModalProps {
    state: UpdateModalState;
    onRelaunch: () => void;
    onClose: () => void;
}

export const UpdateModal = (
    { state, onRelaunch, onClose }: UpdateModalProps,
) => {
    return (
        <Modal
            radius='md'
            opened
            centered
            withCloseButton={false}
            onClose={() => {}}
        >
            {getTitle()}

            <Modal.Body>
                {getBody()}
            </Modal.Body>
        </Modal>
    );

    function getTitle() {
        switch (state.state) {
            case 'CheckingUpdate':
                return;

            case 'Updating':
                return (
                    <Text mb='md'>
                        アップデート中...
                    </Text>
                );

            case 'ConfirmRelaunch':
                return (
                    <Text mb='md'>
                        アップデートが完了しました
                    </Text>
                );
        }
    }

    function getBody() {
        switch (state.state) {
            case 'CheckingUpdate':
                return (
                    <Center>
                        <Loader />
                    </Center>
                );

            case 'Updating':
                return <Progress value={(state.value / state.max) * 100} />;

            case 'ConfirmRelaunch':
                return (
                    <>
                        <Flex
                            justify={{ base: 'center' }}
                            gap={{ base: 'md', sm: 'lg' }}
                        >
                            <Button onClick={onRelaunch}>再起動する</Button>
                            <Button variant='outline' onClick={onClose}>
                                あとで
                            </Button>
                        </Flex>
                    </>
                );
        }
    }
};
