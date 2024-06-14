import { Button, Container, Flex, Heading } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useRef } from 'react';
import { HMSObject, ScheduleList } from '~/libs/schedule';

const scheduleList = new ScheduleList({
    朝礼: new HMSObject(9, 30, 0),
    '1限目': new HMSObject(9, 45, 0),
    休憩1: new HMSObject(10, 35, 0),
    '2限目': new HMSObject(10, 45, 0),
    休憩2: new HMSObject(11, 35, 0),
    '3限目': new HMSObject(11, 45, 0),
    昼休憩: new HMSObject(12, 35, 0),
    '4限目': new HMSObject(13, 15, 0),
    休憩4: new HMSObject(14, 5, 0),
    '5限目': new HMSObject(14, 15, 0),
    休憩5: new HMSObject(15, 5, 0),
    '6限目': new HMSObject(15, 15, 0),
    終礼: new HMSObject(16, 5, 0),
    放課後: new HMSObject(16, 15, 0),
});

export const Main = () => {
    const refTimerId = useRef(0);

    useEffect(() => {
        refTimerId.current = window.setTimeout(async function main() {
            const current = scheduleList.getClosestSchedule(
                HMSObject.fromDate(new Date()),
                'before',
            );
            const next = scheduleList.getClosestSchedule(
                HMSObject.fromDate(new Date()),
                'after',
            );

            await invoke('update_title', {
                title: `[${current ? current[0] : '現在の予定なし'}] ${next && current ? `=${HMSObject.fromSeconds(HMSObject.fromDate(new Date()).getDiff(next[1]))}=> [${next[0]}(${next[1]})]` : '次の予定なし'}`,
            });

            refTimerId.current = window.setTimeout(main, nextTiming());
        }, nextTiming());

        return () => clearTimeout(refTimerId.current);
    }, []);

    return (
        <Container>
            <Flex alignItems="center" direction="column">
                <Heading size="xl" textAlign="center">
                    アルティメット ノコリジカン ワカルヤーツ
                </Heading>
                <Button
                    type="button"
                    colorScheme="teal"
                    onClick={() => {
                        invoke('hide_app');
                    }}
                >
                    アプリを非表示
                </Button>
            </Flex>
        </Container>
    );
};

function nextTiming() {
    return 1000 - (Date.now() % 1000);
}
