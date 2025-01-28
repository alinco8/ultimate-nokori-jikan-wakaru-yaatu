import { Skeleton } from '@mantine/core';
import { Course } from 'src-tauri/bindings/types';
import { Link } from '~/components/Link';
import { Setting } from '~/components/Setting/Setting';
import { invoke } from '~/libs/invoke';
import { useConfigStore } from '~/stores/config';

export const SettingsBasic = () => {
    const config = useConfigStore(store => store.config);
    const setConfig = useConfigStore(store => store.setConfig);

    return config
        ? (
            <Setting.Group title='基本設定'>
                <Setting.Select
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
                        setConfig(async () => {
                            const newConfig = structuredClone(config);

                            newConfig.course = (value
                                ?? newConfig.course) as Course;

                            await invoke('set_config', {
                                newConfig,
                            });
                            await invoke('update_tray');

                            return newConfig;
                        });
                    }}
                />
                <Setting.Select
                    label='表示形式'
                    description='表示形式を設定'
                    onChange={(value) => {
                        setConfig(async () => {
                            const newConfig = structuredClone(config);

                            newConfig.current_formatter = value
                                || newConfig.formatter[0][0];

                            await invoke('set_config', {
                                newConfig,
                            });
                            await invoke('update_tray');

                            return newConfig;
                        });
                    }}
                    allowDeselect={false}
                    key={`formatter-${config.current_formatter}`}
                    defaultValue={config.current_formatter}
                    data={config.formatter.map((fmt) => fmt[0])}
                />
                <Setting.TextInput
                    autoComplete='off'
                    label='PJS API'
                    description={
                        <>
                            プロジェクトシートに紐づけられたGAS APIのURL。
                            <Link
                                to='/help#pjs-setup'
                                style={{ fontSize: 'inherit' }}
                            >
                                セットアップ方法
                            </Link>
                        </>
                    }
                    key={`gas_url-${config.gas_url}`}
                    defaultValue={config.gas_url}
                    placeholder='https://script.google.com/macros/s/.../exec'
                    validator={(s) =>
                        new RegExp(
                            /^(https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9-_]+\/exec|)$/,
                        ).test(s)}
                    onValidValue={(value) => {
                        setConfig(async () => {
                            const newConfig = structuredClone(config);

                            newConfig.gas_url = value;

                            await invoke('set_config', {
                                newConfig,
                            });

                            return newConfig;
                        });
                    }}
                />
            </Setting.Group>
        )
        : <Skeleton />;
};
