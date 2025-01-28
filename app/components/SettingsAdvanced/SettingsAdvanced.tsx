import { Center, Skeleton } from '@mantine/core';
import { Setting } from '~/components/Setting/Setting';
import { invoke } from '~/libs/invoke';
import { useConfigStore } from '~/stores/config';

export const SettingsAdvanced = () => {
    const config = useConfigStore(store => store.config);
    const setConfig = useConfigStore(store => store.setConfig);

    return config
        ? (
            <Setting.Group title='高度な設定'>
                <Setting.Checkbox
                    label='高度な機能'
                    description='高度な機能を有効にする'
                    key={`advanced-${config.advanced.toString()}`}
                    defaultChecked={config.advanced}
                    onChange={(e) => {
                        setConfig(async () => {
                            config.advanced = e.target.checked;

                            await invoke('set_config', {
                                newConfig: config,
                            });

                            return config;
                        });
                    }}
                />
                <Center>
                    <Setting.Button.Modal
                        title='本当にリセットしますか？'
                        description='この操作は取り消せません'
                        onConfirm={() => {
                            setConfig(async () => {
                                await invoke(
                                    'reset_config',
                                );
                                await invoke('update_tray');
                                const config = await invoke(
                                    'get_config',
                                );

                                return config;
                            });
                        }}
                    >
                        設定をリセット
                    </Setting.Button.Modal>
                </Center>
            </Setting.Group>
        )
        : <Skeleton />;
};
