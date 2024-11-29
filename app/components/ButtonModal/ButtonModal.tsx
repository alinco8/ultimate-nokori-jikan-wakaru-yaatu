import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export interface ButtonModalProps {
    title: string;
    message?: string;
    confirmMessage?: string;
    cancelMessage?: string;
    children: React.ReactNode;
    onCancel?: () => void;
    onConfirm: () => void;
}

export const ButtonModal = (
    {
        onCancel,
        onConfirm,
        title,
        message,
        confirmMessage,
        cancelMessage,
        children,
    }: ButtonModalProps,
) => {
    const openModal = () => {
        modals.openConfirmModal({
            centered: true,
            title: title,
            children: (
                <Text size='sm'>
                    {message}
                </Text>
            ),
            labels: {
                cancel: cancelMessage || 'キャンセル',
                confirm: confirmMessage || '続行',
            },
            onCancel,
            onConfirm,
        });
    };

    return (
        <>
            <Button
                onClick={() => {
                    openModal();
                }}
            >
                {children}
            </Button>
        </>
    );
};
