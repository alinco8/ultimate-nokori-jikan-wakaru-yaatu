import { Box, Container, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

export const Header = () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(document.title);
    }, []);

    return (
        <header className={styles.header} data-tauri-drag-region='true'>
            <Text size='md' data-tauri-drag-region='true'>{title}</Text>
        </header>
    );
};

export interface WithHeaderProps {
    children: React.ReactNode;
}

export const WithHeader = ({ children }: WithHeaderProps) => {
    return (
        <>
            <Header />
            <Box id='main' w='100%'>
                <Container>
                    {children}
                </Container>
            </Box>
        </>
    );
};
