import {
    Button,
    Container,
    Flex,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/core';
import { getCurrent } from '@tauri-apps/api/window';
import { useEffect } from 'react';
import { useListen } from '~/libs/listen';
import { HMSObject, ScheduleList } from '~/libs/schedule';

const scheduleList = new ScheduleList(
    {
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
    },
    {
        朝礼: '朝礼',
        '1限目': '1限',
        休憩1: '休1',
        '2限目': '2限',
        休憩2: '休2',
        '3限目': '3限',
        昼休憩: '昼休',
        '4限目': '4限',
        休憩4: '休4',
        '5限目': '5限',
        休憩5: '休5',
        '6限目': '6限',
        終礼: '終礼',
        放課後: 'ﾎｳｶｺﾞ',
    },
);

export const Main = () => {
    useListen('tauri://blur', async () => {
        await getCurrent().hide();
    });

    useEffect(() => {
        invoke('set_schedules', { schedules: scheduleList.toMenuItems() });
    }, []);

    return (
        <Container>
            <Flex alignItems="center" direction="column">
                <RadioGroup
                    defaultValue="normal"
                    onChange={(value) => {
                        invoke('set_config', { config: value });
                    }}
                >
                    <Stack>
                        <Radio value="normal">通常モード</Radio>
                        <Radio value="compact">コンパクトモード</Radio>
                    </Stack>
                </RadioGroup>
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
