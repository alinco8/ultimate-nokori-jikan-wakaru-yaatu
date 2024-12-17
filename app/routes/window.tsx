import { AppShell, Center, Flex, ScrollArea, Stack, Text } from '@mantine/core';
import { IconBook2, IconSettings } from '@tabler/icons-react';
import { Outlet } from 'react-router';
import { Header } from '~/components/Header';
import { SidebarItem } from '~/components/SidebarItem';

export default function Window() {
    return (
        <AppShell
            header={{ height: 29 }}
            navbar={{
                breakpoint: '0',
                width: '2.75rem',
            }}
        >
            <Header />
            <AppShell.Navbar>
                <Flex h='100%' direction='column' justify='space-between'>
                    <Stack />
                    <Stack>
                        <SidebarItem
                            to='/'
                            description='設定'
                            icon={<IconSettings />}
                        />
                    </Stack>
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>
                <ScrollArea h='calc(100vh - 29px)'>
                    <Outlet />
                    <Center mt='lg'>
                        <Text size='xs' c='var(--mantine-color-dimmed)'>
                            © 2024 Alinco8
                        </Text>
                    </Center>
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
}
