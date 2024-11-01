import { AppShell, Button, Flex, Title } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { emit } from '@tauri-apps/api/event';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { memo, useState } from 'react';
import { Main } from '~/components/Header';
import { Update } from '~/components/Update';
import { UpdateModal, UpdateModalState } from '~/components/UpdateModal';
import { useAppVersion } from '~/hooks/useAppVersion';

export const meta: MetaFunction = () => {
    return [{ title: 'アップデート' }, { name: 'description', content: '' }];
};

const updates = [
    {
        version: '1.1.0',
        description: `
## 🔧 バグ修正

- バグXXXXXを修正`,
    },
    {
        version: '1.0.0',
        description: `## ✨️ 新機能

- 機能XXXXを追加

## 🔧 バグ修正

- XXXXXを修正
- XXXXXを修正

## 💎 改善点

- XXXXXXXXのパフォーマンスを向上`,
    },
];

export default function UpdatePage() {
    const [showLatestVersion, setShowLatestVersion] = useState(false);
    const appVersion = useAppVersion();
    const latestAppVersion = updates[0].version;
    const VersionTitle = memo((
        { opacity, value }: { opacity: number; value: string },
    ) => (
        <Title opacity={opacity} style={{ transition: 'opacity 1s' }}>
            {value}
        </Title>
    ));
    VersionTitle.displayName = 'VersionTitle';
    const [updateState, setUpdateState] = useState<UpdateModalState | null>(
        null,
    );

    const update = async () => {
        setUpdateState({ state: 'CheckingUpdate' });
        const update = await check();

        if (update && update.available) {
            setUpdateState({ state: 'Updating', value: 0, max: 0 });
            await update.downloadAndInstall((data) => {
                switch (data.event) {
                    case 'Started':
                        setUpdateState(state => (
                            state
                                ? {
                                    ...state,
                                    max: data.data.contentLength || 0,
                                }
                                : state
                        ));
                        break;

                    case 'Progress':
                        setUpdateState(state => (
                            (state && state.state === 'Updating')
                                ? {
                                    ...state,
                                    value: state.value + data.data.chunkLength,
                                }
                                : state
                        ));
                        break;

                    case 'Finished':
                        setUpdateState({ state: 'ConfirmRelaunch' });
                        break;
                }
            });
            // await relaunch();
        }
    };

    return (
        <AppShell>
            <Main>
                {updateState && (
                    <UpdateModal
                        onRelaunch={() => {
                            void relaunch();
                        }}
                        onClose={() => {
                            void emit('close-update-page', { wait: 0 });
                        }}
                        state={updateState}
                    />
                )}
                <Flex direction='column' align='center' mt='lg'>
                    {updates.map(update => (
                        <Update
                            w='35rem'
                            key={update.version}
                            version={update.version}
                            description={update.description}
                            mb='lg'
                        />
                    ))}
                </Flex>
            </Main>
            <AppShell.Footer
                pos='sticky'
                p='md'
                data-tauri-drag-region='true'
            >
                <Flex
                    justify={{ base: 'center' }}
                    gap={{ base: 'md', sm: 'lg' }}
                    data-tauri-drag-region='true'
                >
                    <Button
                        size='md'
                        onClick={() => {
                            setShowLatestVersion(true);
                            void update();
                        }}
                    >
                        アップデート
                    </Button>
                    <Button
                        size='md'
                        variant='outline'
                        onClick={() => {
                            void emit('close-update-page', { wait: 60 * 15 });
                        }}
                    >
                        15分後に再通知
                    </Button>
                </Flex>
            </AppShell.Footer>
        </AppShell>
    );
}
