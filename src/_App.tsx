import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Container,
    Heading,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ScheduleMap, ScheduleTime } from './libs/_schedule';
import {
    Renderable,
    TypeAnimationSentence,
    TypeAnimationWord,
} from './libs/type-animation';

const scheduleMap = new ScheduleMap('school', {
    朝礼: ScheduleTime.fromStr('9:30:00'),
    '1限目': ScheduleTime.fromStr('9:45:00'),
    休憩1: ScheduleTime.fromStr('10:35:00'),
    '2限目': ScheduleTime.fromStr('10:45:00'),
    休憩2: ScheduleTime.fromStr('11:35:00'),
    '3限目': ScheduleTime.fromStr('11:45:00'),
    昼休憩: ScheduleTime.fromStr('12:35:00'),
    '4限目': ScheduleTime.fromStr('13:15:00'),
    休憩4: ScheduleTime.fromStr('14:05:00'),
    '5限目': ScheduleTime.fromStr('14:15:00'),
    休憩5: ScheduleTime.fromStr('15:05:00'),
    '6限目': ScheduleTime.fromStr('15:15:00'),
    終礼: ScheduleTime.fromStr('16:05:00'),
    放課後: ScheduleTime.fromStr('16:15:00'),
});

const anim = new TypeAnimationSentence([
    new TypeAnimationWord('あるてぃめっと', ['アルティメット']),
    new TypeAnimationWord('のこり', ['ノコリ']),
    new TypeAnimationWord('じかん', ['ジカン']),
    new TypeAnimationWord('わかるやーつ', ['ワカルヤーツ']),
]).render();

export const App = () => {
    const [text, setText] = useState<Renderable[]>([]);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const intId = setInterval(() => {
            const iterable = anim.next();

            setText(iterable.value);
            if (iterable.done) {
                clearInterval(intId);
            }
        }, 150);

        return () => {
            clearInterval(intId);
        };
    }, []);
    useEffect(() => {
        setBlink(true);

        const intId = setInterval(() => {
            setBlink((blink) => !blink);
        }, 500);

        return () => {
            clearInterval(intId);
        };
    }, [text]);

    return (
        <>
            <Header />
            <Container>
                <Card>
                    <CardHeader textAlign="center">
                        <Heading>
                            {text.map((txt) => (
                                <span
                                    key={txt.text}
                                    style={{
                                        textDecoration: txt.decoration
                                            ? 'underline'
                                            : 'none',
                                    }}
                                >
                                    {txt.text}
                                </span>
                            ))}
                            <span
                                style={{
                                    opacity: Number(blink),
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                }}
                            >
                                |
                            </span>
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Center>
                            <Button
                                colorScheme="teal"
                                onClick={async () => {
                                    await invoke('hide_app');
                                }}
                            >
                                アプリを隠す
                            </Button>
                        </Center>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};
