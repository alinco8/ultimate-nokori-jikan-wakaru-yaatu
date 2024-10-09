import { Text } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { WithHeader } from '~/components/Header';

export const meta: MetaFunction = () => {
    return [{ title: 'Index' }, { name: 'description', content: '' }];
};

export default function Index() {
    return (
        <>
            <WithHeader>
                <Text>hello! i am index page!</Text>
            </WithHeader>
        </>
    );
}
