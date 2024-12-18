import { AppShell, Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './style.module.scss';

export const Header = () => {
    const [title, setTitle] = useState('');
    const location = useLocation();

    useEffect(() => {
        setTitle(document.title);
    }, [location]);

    return (
        <AppShell.Header
            data-tauri-drag-region='true'
            className={styles.header}
        >
            <Flex
                h='100%'
                align='center'
                justify='center'
                data-tauri-drag-region='true'
            >
                <Text size='md' data-tauri-drag-region='true'>{title}</Text>
            </Flex>
        </AppShell.Header>
    );
};
