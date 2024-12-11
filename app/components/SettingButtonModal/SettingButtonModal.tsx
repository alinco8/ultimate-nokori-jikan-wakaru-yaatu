import { ButtonModal, ButtonModalProps } from '~/components/ButtonModal';
import { useDisabled } from '~/contexts/disabled';

export type SettingButtonModalProps = {
    disableWhenPending?: boolean;
} & ButtonModalProps;

export const SettingButtonModal = (
    { disableWhenPending = true, ...buttonModalProps }: SettingButtonModalProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <ButtonModal
            {...buttonModalProps}
            disabled={disableWhenPending && isDisabled}
        />
    );
};
