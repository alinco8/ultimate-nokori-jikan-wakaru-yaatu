import { Route } from '.react-router/types/app/+types/root';
import {
    Accordion,
    Center,
    Checkbox,
    Container,
    Skeleton,
    Stack,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import type { AppConfig } from 'src-tauri/bindings/types';
import { BasicFormatterTable } from '~/components/BasicFormatterTable';
import { ButtonModal } from '~/components/ButtonModal';
import { WithHeader } from '~/components/Header';
import { SettingItem } from '~/components/SettingItem';
import { invoke } from '~/libs/invoke';

export const meta: Route.MetaFunction = () => {
    return [{ title: '設定' }, { name: 'description', content: '' }];
};

export default function Home() {
    const [config, setConfig] = useState<AppConfig>();
    const [promise, setPromise] = useState(false);

    useEffect(() => {
        void (async () => {
            const config = await invoke('get_config');

            setConfig(config);
        })();
    }, []);

    return (
        <>
            <WithHeader>
                <Container w='30rem'>
                    {config
                        ? (
                            <Accordion
                                variant='default'
                                multiple
                                defaultValue={['basic']}
                            >
                                <SettingItem
                                    title='基本設定'
                                    order={2}
                                    value='basic'
                                >
                                    <Stack>
                                        <Title order={3}>Formatter</Title>
                                        <Stack>
                                            <BasicFormatterTable
                                                disabled={promise}
                                                formatter={config.formatter}
                                                current={config
                                                    .current_formatter}
                                                onCurrentChange={(name) => {
                                                    void (async () => {
                                                        setPromise(true);
                                                        config
                                                            .current_formatter =
                                                                name;

                                                        setConfig(config);

                                                        await invoke(
                                                            'set_config',
                                                            {
                                                                newConfig:
                                                                    config,
                                                            },
                                                        );
                                                        await invoke(
                                                            'update_tray',
                                                        );
                                                    })().finally(() => {
                                                        setPromise(false);
                                                    });
                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                </SettingItem>

                                <SettingItem
                                    title='高度な設定'
                                    order={2}
                                    value='advanced'
                                >
                                    <Stack>
                                        <Checkbox
                                            label='上級者向け'
                                            defaultChecked={config.advanced}
                                            onChange={(e) => {
                                                void (async () => {
                                                    config.advanced =
                                                        e.target.checked;

                                                    await invoke('set_config', {
                                                        newConfig: config,
                                                    });

                                                    setConfig(config);
                                                })().finally(() => {
                                                    setPromise(false);
                                                });
                                            }}
                                        />
                                        <Center>
                                            <ButtonModal
                                                title='設定をリセットしますか？'
                                                message='この操作を戻すことはできません。'
                                                confirmMessage='リセット'
                                                onConfirm={() => {
                                                    void (async () => {
                                                        setPromise(true);
                                                        await invoke(
                                                            'reset_config',
                                                        );
                                                        setConfig(
                                                            await invoke(
                                                                'get_config',
                                                            ),
                                                        );
                                                    })().finally(() => {
                                                        setPromise(false);
                                                    });
                                                }}
                                            >
                                                設定のリセット
                                            </ButtonModal>
                                        </Center>
                                    </Stack>
                                </SettingItem>
                            </Accordion>
                        )
                        : <Skeleton />}
                </Container>
            </WithHeader>
        </>
    );
}
