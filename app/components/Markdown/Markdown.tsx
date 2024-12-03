import { Anchor, Box, Divider, List, Table, Text, Title } from '@mantine/core';
import Marked, { Components } from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import styles from './styles.module.scss';

// mb-4 mt-6 pb-2
const components: Components = {
    h1: ({ children }) => (
        <Box mb='md' mt='lg' pb='sm'>
            <Title order={1}>
                {children}
            </Title>
            <Divider />
        </Box>
    ),
    h2: ({ children }) => (
        <Box mb='md' mt='lg' pb='sm'>
            <Title order={2}>{children}</Title>
            <Divider />
        </Box>
    ),
    h3: ({ children }) => (
        <>
            <Title order={3} mb='md' mt='lg'>{children}</Title>
        </>
    ),
    h4: ({ children }) => (
        <>
            <Title order={4} mb='md' mt='lg'>{children}</Title>
        </>
    ),
    h5: ({ children }) => (
        <>
            <Title order={5} mb='md' mt='lg'>{children}</Title>
        </>
    ),
    h6: ({ children }) => (
        <>
            <Title order={6} mb='md' mt='lg'>{children}</Title>
        </>
    ),
    p: ({ children }) => <Text>{children}</Text>,
    a: ({ children, href, id }) => (
        <Anchor
            href={href}
            id={id}
            {...(href && new URL(href, location.href).host !== location.host
                && {
                    target: '_blank',
                    rel: 'noreferrer noopener',
                })}
        >
            {children}
        </Anchor>
    ),
    table: ({ children }) => (
        <Table withColumnBorders withTableBorder striped>{children}</Table>
    ),
    thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
    tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
    tfoot: ({ children }) => <Table.Tfoot>{children}</Table.Tfoot>,
    tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
    th: ({ children, style }) => <Table.Th style={style}>{children}</Table.Th>,
    td: ({ children, style }) => <Table.Td style={style}>{children}</Table.Td>,

    ol: ({ children }) => <List type='ordered' pl='xl'>{children}</List>,
    ul: ({ children }) => <List pl='xl'>{children}</List>,
    li: ({ children }) => <List.Item>{children}</List.Item>,
};

export interface MarkdownProps {
    content: string;
}

export const Markdown = ({ content }: MarkdownProps) => {
    return (
        <Marked
            components={components}
            remarkPlugins={[
                remarkGfm,
                remarkBreaks,
                remarkEmoji,
            ]}
            className={styles.markdown}
        >
            {content}
        </Marked>
    );
};
