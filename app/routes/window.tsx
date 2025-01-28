import {
    AppShell,
    Center,
    Container,
    Flex,
    ScrollArea,
    Tabs,
    Text,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import { IconBook2, IconHelp, IconSettings } from '@tabler/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Header } from '~/components/Header';
import { useConfigStore } from '~/stores/config';

export default function Window() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useMantineTheme();

    const config = useConfigStore(store => store.config);

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
                            <Tooltip
                                label={
                                    <>
                                        設定 の「PJS API」が必要です
                                    </>
                                }
                            >
                                <Tabs.Tab
                                    value='/diary'
                                    key={`tab-diary-${!config?.gas_url}`}
                                    disabled={!config?.gas_url}
                                >
                                    <IconBook2 />
                                </Tabs.Tab>
                            </Tooltip>
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
                            <Tabs.Tab value='/help'>
                                <IconHelp />
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.List>
                            <Tabs.Tab value='/'>
                                <IconSettings />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>
                <ScrollArea h='calc(100vh - 29px)'>
                    <Container pt='lg'>
                        <Outlet />
                    </Container>
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
