import { Route } from '.react-router/types/app/+types/root';
import { Container, Flex, Text, Title } from '@mantine/core';
import { useRef } from 'react';
import { weightedRandom } from '~/libs/weightedRandom';

export const meta: Route.MetaFunction = () => {
    return [{ title: 'Not Found' }, { name: 'description', content: '' }];
};

const Emojis = {
    '¯\\_(ツ)_/¯': 1,
    '(´･_･`)': 3,
    '(´；д；`)': 3,
    '(´･ω･`)': 5,
    '(´・ω・`)': 5,
    '(；￣Д￣)': 10,
    '(´・_・`)': 10,
    '(；´д｀)ゞ': 10,
    '(｡•́︿•̀｡)': 50,
    '(´-﹏-`；)': 50,
    '(￣◇￣;)': 50,
    '( •́ .̫ •̀ )': 50,
    '(･ω･`；)': 50,
};

export default function NotFound() {
    const kaomoji = useRef(weightedRandom(Emojis));

    return (
        <Container pt='lg'>
            <Flex direction='column' align='center'>
                <Title>
                    Not Found
                </Title>
                <Text>
                    お探しのページが見つかりませんでした。
                </Text>
                <Title c='var(--mantine-color-dimmed)' mt='lg'>
                    {kaomoji.current.key}
                </Title>
                <Text c='var(--mantine-color-dimmed)'>
                    ↑ {kaomoji.current.chance}%
                </Text>
            </Flex>
        </Container>
    );
}
