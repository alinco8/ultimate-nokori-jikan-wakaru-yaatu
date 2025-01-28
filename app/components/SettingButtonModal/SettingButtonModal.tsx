import { ButtonModal, ButtonModalProps } from '~/components/ButtonModal';
import { useConfigStore } from '~/stores/config';

export type SettingButtonModalProps = {
    disableWhenPending?: boolean;
} & ButtonModalProps;

export const SettingButtonModal = (
    { disableWhenPending = true, ...buttonModalProps }: SettingButtonModalProps,
) => {
    const loading = useConfigStore(store => store.loading);

    return (
        <ButtonModal
            {...buttonModalProps}
            disabled={disableWhenPending && loading}
        />
    );
};
