import { Container, Skeleton, Textarea, Title } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { FormatterTable } from '~/components/FormatterTable';
import { WithHeader } from '~/components/Header';
import { invoke } from '~/libs/invoke';
import type { AppConfig } from '../../src-tauri/bindings/greet';

export const meta: MetaFunction = () => {
    return [{ title: 'Index' }, { name: 'description', content: '' }];
};

declare global {
    interface Window {
        invoke: typeof invoke;
    }
}

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
                    <Title order={2}>Formatter</Title>
                    {config
                        ? (
                            <>
                                <FormatterTable
                                    disabled={promise}
                                    formatter={config.formatter}
                                    current={config.current_formatter}
                                    onCurrentChange={(name) => {
                                        void (async () => {
                                            setPromise(true);
                                            config.current_formatter = name;

                                            setConfig(config);

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');
                                        })().finally(() => {
                                            setPromise(false);
                                        });
                                    }}
                                    onAdd={() => {
                                        console.log('add');

                                        void (async () => {
                                            setPromise(true);
                                            let i = 0;
                                            let name: string;

                                            while (
                                                config
                                                    .formatter[
                                                        name = `example${
                                                            (i || '').toString()
                                                        }`
                                                    ]
                                            ) {
                                                i++;
                                            }

                                            const newConfig = {
                                                ...config,
                                                formatter: {
                                                    ...config.formatter,
                                                    [name]: 'example',
                                                },
                                            };

                                            setConfig(newConfig);

                                            await invoke('set_config', {
                                                newConfig,
                                            });
                                            await invoke('update_tray');
                                        })().finally(() => {
                                            setPromise(false);
                                        });
                                    }}
                                    onDelete={(name) => {
                                        void (async () => {
                                            setPromise(true);

                                            delete config.formatter[name];
                                            if (
                                                config.current_formatter
                                                    === name
                                            ) {
                                                config.current_formatter =
                                                    Object.keys(
                                                        config.formatter,
                                                    )[0];
                                            }

                                            setConfig(config);

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');
                                        })().finally(() => {
                                            setPromise(false);
                                        });
                                    }}
                                    onNameChange={(name, newName) => {
                                        void (async () => {
                                            setPromise(true);

                                            config.formatter[newName] =
                                                config.formatter[name];
                                            delete config.formatter[name];
                                            if (
                                                config.current_formatter
                                                    === name
                                            ) {
                                                config.current_formatter =
                                                    newName;
                                            }

                                            setConfig(config);

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');
                                        })().finally(() => {
                                            setPromise(false);
                                        });
                                    }}
                                />
                                <Textarea
                                    onBlur={(e) => {
                                        void (async () => {
                                            setPromise(true);

                                            config
                                                .formatter[
                                                    config.current_formatter
                                                ] = e.currentTarget.value;

                                            setConfig(config);

                                            await invoke('set_config', {
                                                newConfig: config,
                                            });
                                            await invoke('update_tray');
                                        })().finally(() => {
                                            setPromise(false);
                                        });
                                    }}
                                    style={{
                                        position: 'sticky',
                                        bottom: '0px',
                                    }}
                                    key={config.current_formatter}
                                    defaultValue={config
                                        .formatter[config.current_formatter]}
                                />
                            </>
                        )
                        : (
                            <>
                                <Skeleton />
                            </>
                        )}
                </Container>
            </WithHeader>
        </>
    );
}
