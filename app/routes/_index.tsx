import { Container, Radio, Stack, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import type { MetaFunction } from '@remix-run/node';
import { WithHeader } from '~/components/Header';
import { invoke } from '~/libs/invoke';

export const meta: MetaFunction = () => {
    return [{ title: 'Index' }, { name: 'description', content: '' }];
};

declare global {
    interface Window {
        invoke: typeof invoke;
    }
}

export default function Index() {
    const [value, setValue] = useLocalStorage<
        'compact' | 'normal' | null
    >(
        { key: 'mode', defaultValue: null },
    );

    return (
        <>
            <WithHeader>
                <Container w='30rem'>
                    <Title order={2}>モード</Title>
                    <Radio.Group
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onChange={async (raw) => {
                            const select = raw as 'compact' | 'normal';

                            const config = await invoke('get_config');

                            config.mode = select;
                            setValue(
                                select,
                            );

                            await invoke('set_config', { config });
                        }}
                        value={value}
                    >
                        <Stack mt='md'>
                            <Radio
                                value='compact'
                                label='Compact'
                            />
                            <Radio value='normal' label='Normal' />
                        </Stack>
                    </Radio.Group>
                </Container>
            </WithHeader>
        </>
    );
}
