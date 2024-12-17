import {
    AppShell,
    Center,
    Divider,
    Flex,
    ScrollArea,
    Tabs,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { IconBook2, IconSettings } from '@tabler/icons-react';
import { useLocation } from 'react-router';
import { Outlet, useNavigate } from 'react-router';
import { Header } from '~/components/Header';

export default function Window() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useMantineTheme();

    return (
        <AppShell
            header={{ height: 29 }}
            navbar={{
                breakpoint: '0',
                width: `calc(${theme.spacing.md.toString()} * 2 + 24px)`,
            }}
        >
            <Header />
            <AppShell.Navbar>
                <Flex h='100%' direction='column' justify='space-between'>
                    <Tabs
                        value={location.pathname}
                        onChange={(value) => {
                            if (value) {
                                void navigate(value);
                            }
                        }}
                    >
                        <Tabs.List>
                            <Tabs.Tab value='/diary'>
                                <IconBook2 />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                    <Tabs
                        value={location.pathname}
                        onChange={(value) => {
                            if (value) {
                                void navigate(value);
                            }
                        }}
                    >
                        <Tabs.List>
                            <Tabs.Tab value='/' bottom='0px'>
                                <IconSettings />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>
                <ScrollArea h='calc(100vh - 29px)'>
                    <Outlet />
                    <Center mt='10rem'>
                        <Text size='xs' c='var(--mantine-color-dimmed)'>
                            © 2024 Alinco8
                        </Text>
                    </Center>
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
}
