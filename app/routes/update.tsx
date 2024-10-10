import { AppShell, Box, Button, Card, Center, Flex } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { Header, Main, WithHeader } from '~/components/Header';
import { Update } from '~/components/Update';

export const meta: MetaFunction = () => {
    return [{ title: 'Update' }, { name: 'description', content: '' }];
};

const updates = [
    {
        version: '1.1.0',
        description: `
## 🔧 バグ修正

- アップデートボタンが反応しないバグを修正`,
    },
    {
        version: '1.0.0',
        description: `## ✨️ 新機能

- 日記機能を追加

## 🔧 バグ修正

- 設定ページのデザイン崩れを修正
- アプリにしばらくフォーカスしていないと、タイマーが止まるバグを修正

## 💎 改善点

- タイマーシステムのパフォーマンスを向上`,
    },
];

export default function UpdatePage() {
    return (
        <AppShell>
            <Header />
            <Main>
                <Flex direction='column' align='center'>
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
                // pos='absolute'
                // right='0px'
                // bottom='0px'
                // style={{ zIndex: 100 }}
            >
                <Flex
                    justify={{ base: 'center' }}
                    gap={{ base: 'md', sm: 'lg' }}
                >
                    <Button>アップデート</Button>
                    <Button variant='outline'>15分後に再通知</Button>
                </Flex>
            </AppShell.Footer>
        </AppShell>
    );
}
