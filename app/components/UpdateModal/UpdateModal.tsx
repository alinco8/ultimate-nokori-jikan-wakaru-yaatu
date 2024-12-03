import { Center, Loader, Modal, Progress, Text } from '@mantine/core';

export type UpdateModalState = {
    state: 'CheckingUpdate';
} | {
    state: 'Updating';
    value: number;
    max: number;
} | {
    state: 'Relaunching';
};

export interface UpdateModalProps {
    state: UpdateModalState;
}

export const UpdateModal = (
    { state }: UpdateModalProps,
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

            case 'Relaunching':
                return (
                    <Text mb='md'>
                        再起動中...
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

            case 'Relaunching':
                return (
                    <>
                    </>
                );
        }
    }
};
