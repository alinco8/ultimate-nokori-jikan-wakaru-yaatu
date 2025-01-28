import { Button, ButtonProps, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export type ButtonModalProps = {
    title: string;
    description?: string;
    confirmMessage?: string;
    cancelMessage?: string;
    onCancel?: () => void;
    onConfirm: () => void;
} & ButtonProps;

export const ButtonModal = (
    {
        onCancel,
        onConfirm,
        title,
        description,
        confirmMessage,
        cancelMessage,
        ...buttonProps
    }: ButtonModalProps,
) => {
    const openModal = () => {
        modals.openConfirmModal({
            centered: true,
            title,
            children: (
                <Text size='sm' fw={500} c='var(--mantine-color-dimmed)'>
                    {description}
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
                {...buttonProps}
                onClick={() => {
                    openModal();
                }}
            />
        </>
    );
};
