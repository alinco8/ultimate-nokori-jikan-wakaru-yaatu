import { AppShell, Button, Flex, Loader } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { emit } from '@tauri-apps/api/event';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { useEffect, useState } from 'react';
import { Main } from '~/components/Header';
import { Update } from '~/components/Update';
import { UpdateModal, UpdateModalState } from '~/components/UpdateModal';

export const meta: MetaFunction = () => {
    return [{ title: 'アップデート' }, { name: 'description', content: '' }];
};

interface Update {
    notes: string;
    pub_date: string;
    signature: string;
    url: string;
    version: string;
}

export default function UpdatePage() {
    const [updateState, setUpdateState] = useState<UpdateModalState | null>(
        null,
    );
    const [updates, setUpdates] = useState<Update[] | null>(null);

    useEffect(() => {
        void (async () => {
            const params = new URLSearchParams(location.search);
            const curr = params.get('current');
            const next = params.get('next');

            if (!curr || !next) return;

            const updates = await (await fetch(
                `https://free-joceline-alinco8-9535565b.koyeb.app/releases/descriptions?start=${curr}&end=${next}`,
            )).json() as Update[];

            setUpdates(updates);
        })();
    }, []);

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
                        setUpdateState({ state: 'Relaunching' });
                        break;
                }
            });
            await relaunch();
        }
    };

    return (
        <AppShell>
            <Main>
                {updateState && (
                    <UpdateModal
                        state={updateState}
                    />
                )}
                <Flex direction='column' align='center' mt='lg'>
                    {updates
                        ? updates.map(update => (
                            <Update
                                w='35rem'
                                key={update.version}
                                version={update.version}
                                description={update.notes.split('\n').slice(1)
                                    .join('\n')}
                                mb='lg'
                            />
                        ))
                        : <Loader />}
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
