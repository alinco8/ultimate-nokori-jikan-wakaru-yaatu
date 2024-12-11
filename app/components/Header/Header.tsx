import { AppShell, Center, ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';

export const Header = () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(document.title);
    }, []);

    return (
        <AppShell.Header
            data-tauri-drag-region='true'
            pos='sticky'
            className={styles.header}
        >
            <Text size='md' data-tauri-drag-region='true'>{title}</Text>
        </AppShell.Header>
    );
};

export interface MainProps {
    children: React.ReactNode;
}
export const Main = ({ children }: MainProps) => {
    return (
        <AppShell.Main style={{ height: '100%' }}>
            <ScrollArea h='calc(100vh - 29px)'>
                {children}
                <Center mt='lg'>
                    <Text size='xs' c='var(--mantine-color-dimmed)'>
                        © 2024 Alinco8
                    </Text>
                </Center>
            </ScrollArea>
        </AppShell.Main>
    );
};

export interface WithoutHeaderProps {
    children: React.ReactNode;
}
export const WithoutHeader = ({ children }: WithoutHeaderProps) => {
    return (
        <AppShell
            style={{ height: '100%' }}
        >
            <Main>
                {children}
            </Main>
        </AppShell>
    );
};

export interface WithHeaderProps {
    children: React.ReactNode;
}
export const WithHeader = ({ children }: WithHeaderProps) => {
    return (
        <AppShell>
            <Header />
            <Main>{children}</Main>
        </AppShell>
    );
};
