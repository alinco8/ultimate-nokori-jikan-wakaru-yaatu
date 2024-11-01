import { Button, Container, Title } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { WithHeader } from '~/components/Header';
import { calcTodayDiaryCell, getDiary } from '~/libs/diary';

export const meta: MetaFunction = () => {
    return [{ title: 'アップデート' }, { name: 'description', content: '' }];
};

const GAS =
    'https://script.google.com/macros/s/AKfycbwIyttpQFg27Wkw5v1SQpm1pnoBIHrcdvHgb4vbrHw5eF5iIcBRXSe_jICKtVXJcbR0DQ/exec?sheet=日誌・自主学習&range=B7:F506';

export default function Diary() {
    const [schedules, setSchedules] = useState<
        [string, string, string, string, string, string] | null
    >(null);

    return (
        <WithHeader>
            <Button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => {
                    const cell = calcTodayDiaryCell().toString();

                    const url = new URL(GAS);

                    url.searchParams.set('sheet', '日誌・自主学習');
                    url.searchParams.set('range', cell);

                    console.log(
                        await (await fetch(url, {
                            method: 'GET',
                        })).json(),
                    );
                }}
            >
                Button
            </Button>
            <Container>
                <Title>Diary</Title>
            </Container>
        </WithHeader>
    );
}
