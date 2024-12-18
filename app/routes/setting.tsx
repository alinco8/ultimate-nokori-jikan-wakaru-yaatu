import { Route } from '.react-router/types/app/+types/root';
import { Center, Container, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { AppConfig, Course } from 'src-tauri/bindings/types';
import { Setting } from '~/components/Setting';
import { SettingButtonModal } from '~/components/SettingButtonModal';
import { SettingCheckbox } from '~/components/SettingCheckbox';
import { SettingGroup } from '~/components/SettingGroup';
import { SettingSelect } from '~/components/SettingSelect';
import { SettingTextInput } from '~/components/SettingTextInput';
import { createDisabled, DisableProvider } from '~/contexts/disabled';
import { invoke } from '~/libs/invoke';

export const meta: Route.MetaFunction = () => {
    return [{ title: '設定' }, { name: 'description', content: '' }];
};

export default function Home() {
    const [config, setConfig] = useState<AppConfig>();
    const { isDisabled, setDisabled } = createDisabled(false);

    useEffect(() => {
        void (async () => {
            const config = await invoke('get_config');

            setConfig(config);
        })();
    }, []);
    const changeConfig = (func: () => AppConfig | Promise<AppConfig>) => {
        void (async () => {
            setDisabled(true);

            const config = await func();

            setConfig(config);
        })().finally(() => {
            setDisabled(false);
        });
    };

    return (
        <DisableProvider isDisabled={isDisabled} setDisabled={setDisabled}>
            <Container w='40rem'>
                {config
                    ? (
                        <Setting>
                            <SettingGroup title='基本設定'>
                                <SettingSelect
                                    label='コース'
                                    description='コースを選択'
                                    allowDeselect={false}
                                    key={`course-${config.course}`}
                                    defaultValue={config.course}
                                    data={[
                                        {
                                            value: 'One',
                                            label: '週1',
                                        },
                                        {
                                            value: 'Three',
                                            label: '週3',
                                        },
                                        {
                                            value: 'Five',
                                            label: '週5',
                                        },
                                    ]}
                                    onChange={(value: string | null) => {
                                        changeConfig(async () => {
                                            config.course = (value
                                                ?? config.course) as Course;

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');

                                            return config;
                                        });
                                    }}
                                />
                                <SettingSelect
                                    label='Formatter'
                                    description='表示形式を設定'
                                    onChange={(value) => {
                                        changeConfig(async () => {
                                            config.current_formatter = value
                                                || config.formatter[0][0];

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');

                                            return config;
                                        });
                                    }}
                                    allowDeselect={false}
                                    key={`formatter-${config.current_formatter}`}
                                    defaultValue={config.current_formatter}
                                    data={config.formatter.map((fmt) => fmt[0])}
                                />
                                <SettingTextInput
                                    autoComplete='off'
                                    label='PJS API'
                                    description='プロジェクトシートに紐づけられたGAS APIのURL'
                                    key={`gas_url-${config.gas_url}`}
                                    defaultValue={config.gas_url}
                                    placeholder='https://script.google.com/macros/s/.../exec'
                                    validator={(s) =>
                                        new RegExp(
                                            /^(https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9-_]+\/exec|)$/,
                                        ).test(s)}
                                    onValidValue={(value) => {
                                        changeConfig(async () => {
                                            config.gas_url = value;

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });

                                            return config;
                                        });
                                    }}
                                />
                            </SettingGroup>
                            <SettingGroup title='高度な設定'>
                                <SettingCheckbox
                                    label='高度な機能'
                                    description='高度な機能を有効にする'
                                    key={`advanced-${config.advanced.toString()}`}
                                    defaultChecked={config.advanced}
                                    onChange={(e) => {
                                        changeConfig(async () => {
                                            config.advanced = e.target.checked;

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });

                                            return config;
                                        });
                                    }}
                                />
                                <Center>
                                    <SettingButtonModal
                                        title='本当にリセットしますか？'
                                        description='この操作は取り消せません'
                                        onConfirm={() => {
                                            changeConfig(async () => {
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
                                    </SettingButtonModal>
                                </Center>
                            </SettingGroup>
                        </Setting>
                    )
                    : <Skeleton />}
            </Container>
        </DisableProvider>
    );
}
