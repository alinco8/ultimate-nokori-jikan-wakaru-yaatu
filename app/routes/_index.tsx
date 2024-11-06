import {
    Accordion,
    Button,
    Center,
    Checkbox,
    Container,
    Skeleton,
    Stack,
    Title,
} from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { FormatterTable } from '~/components/FormatterTable';
import { WithHeader } from '~/components/Header';
import { SettingItem } from '~/components/SettingItem';
import { invoke } from '~/libs/invoke';
import type { AppConfig } from '../../src-tauri/bindings/greet';

export const meta: MetaFunction = () => {
    return [{ title: '設定' }, { name: 'description', content: '' }];
};

export default function Index() {
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
                    <Accordion
                        variant='default'
                        multiple
                        defaultValue={['basic']}
                    >
                        <SettingItem title='基本設定' order={2} value='basic'>
                            <Stack>
                                <Title order={3}>Formatter</Title>
                                <Stack>
                                    {config
                                        ? (
                                            <FormatterTable
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
                                        )
                                        : <Skeleton />}
                                </Stack>
                            </Stack>
                        </SettingItem>

                        <SettingItem
                            title='高度な設定'
                            order={2}
                            value='advanced'
                        >
                            <Stack>
                                <Checkbox label='Formatterのカスタマイズ' />
                                <Center>
                                    <Button
                                        onClick={() => {
                                            void (async () => {
                                                setPromise(true);
                                                await invoke('reset_config');
                                                setConfig(
                                                    await invoke('get_config'),
                                                );
                                            })().finally(() => {
                                                setPromise(false);
                                            });
                                        }}
                                    >
                                        設定のリセット
                                    </Button>
                                </Center>
                            </Stack>
                        </SettingItem>
                    </Accordion>
                </Container>
            </WithHeader>
        </>
    );
}
