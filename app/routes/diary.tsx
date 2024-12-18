import { Route } from '.react-router/types/app/+types/root';
import { Alert, Center, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { addDays, getISODay, subDays } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { AppConfig } from 'src-tauri/bindings/types';
import { Diary } from '~/components/Diary';
import { createDisabled, DisableProvider } from '~/contexts/disabled';
import { useDeepCompareMemorize } from '~/hooks/deepCompare';
import { Cacher } from '~/libs/cacher';
import { checkTodayByDate, course2num, sliceByCourse } from '~/libs/course';
import { invoke } from '~/libs/invoke';
import { Cell, getRemoteDiaries, setRemoteDiaries } from '~/libs/pjs';

export const meta: Route.MetaFunction = () => {
    return [{ title: '日誌' }, { name: 'description', content: '' }];
};

export type Diaries = { diary: string; date: string }[];

export const clientLoader = () => {
    const today = new Date('2024-12-18');
    const weekDay = getISODay(today) - 1;
    const monday = subDays(today, weekDay);

    return { today, weekDay, monday };
};

export default function DiaryPage() {
    const { today, weekDay, monday } = useLoaderData<typeof clientLoader>();
    const revalidator = useRevalidator();
    const cacher = useRef(new Cacher<Diaries>('diaries'));
    const [config, setConfig] = useState<AppConfig | null>(null);
    const [diaries, setDiaries] = useState<
        Diaries | 'fetching' | null
    >(null);
    const { isDisabled, setDisabled } = createDisabled(false);
    const [failed, setFailed] = useState(false);
    const onFocus = () => {
        revalidator.revalidate().catch((e: unknown) => {
            console.error(e);
        });
    };

    const updateDiaries = (diary: string, date: string) => {
        setDiaries((diaries) =>
            Array.isArray(diaries)
                ? (
                    diaries.map(
                        d => d.date === date
                            ? {
                                date,
                                diary,
                            }
                            : d,
                    )
                )
                : diaries
        );
    };

    useEffect(() => {
        if (diaries === null) {
            setDiaries('fetching');

            invoke('get_config').then((config) => {
                setConfig(config);

                return cacher.current.getOrSet(async () => {
                    const diaries = await getRemoteDiaries(
                        config.gas_url,
                        [monday, addDays(monday, 4)],
                        new Date('2024/4/22'),
                        new Cell('B7'),
                        10,
                    );

                    return diaries.map((diary, i) => ({
                        diary,
                        date: addDays(monday, i).toLocaleDateString(),
                    }));
                }).then((diaries) => {
                    setDiaries(diaries);
                });
            }).catch((err: unknown) => {
                console.error(err);

                setFailed(true);
            });
        }

        window.addEventListener('focus', onFocus);

        return () => {
            window.removeEventListener('focus', onFocus);
        };
    }, []);
    useEffect(() => {
        if (Array.isArray(diaries)) {
            cacher.current.set(diaries);
            setDisabled(true);
            invoke('get_config').then((config) => {
                return setRemoteDiaries(
                    config.gas_url,
                    [monday, addDays(monday, 4)],
                    new Date('2024/4/22'),
                    new Cell('B7'),
                    10,
                    diaries.map(({ diary }) => diary),
                );
            }).finally(() => {
                setDisabled(false);
            }).catch((err: unknown) => {
                console.error(err);

                setFailed(true);
            });
        }
    }, [diaries].map(useDeepCompareMemorize));

    return (
        <Container mt='lg'>
            {config
                ? config.gas_url
                    ? new RegExp(
                            /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9-_]+\/exec$/,
                        ).test(config.gas_url)
                        ? failed
                            ? (
                                <Alert
                                    color='red'
                                    icon={<IconAlertTriangle />}
                                    title='PJS APIの取得に失敗しました'
                                >
                                    URLが不正な可能性があります。
                                    設定画面から設定を行ってください。
                                </Alert>
                            )
                            : (
                                <DisableProvider
                                    isDisabled={isDisabled}
                                    setDisabled={setDisabled}
                                >
                                    {Array.isArray(diaries)
                                        ? (
                                            <>
                                                <SimpleGrid
                                                    cols={course2num(
                                                        config.course,
                                                    )}
                                                >
                                                    {sliceByCourse(
                                                        diaries,
                                                        config.course,
                                                    )
                                                        .map(
                                                            (
                                                                { diary, date },
                                                                i,
                                                            ) => {
                                                                return today
                                                                        .toLocaleDateString()
                                                                        === date
                                                                    ? (
                                                                        <Diary
                                                                            key={i}
                                                                            diary=''
                                                                            date=''
                                                                            empty
                                                                        />
                                                                    )
                                                                    : (
                                                                        <Diary
                                                                            key={i}
                                                                            date={date}
                                                                            diary={diary}
                                                                            onBlur={(
                                                                                value,
                                                                            ) => {
                                                                                updateDiaries(
                                                                                    value,
                                                                                    date,
                                                                                );
                                                                            }}
                                                                        />
                                                                    );
                                                            },
                                                        )}
                                                </SimpleGrid>
                                                {checkTodayByDate(
                                                    today.toLocaleDateString(),
                                                    monday.toLocaleDateString(),
                                                    config.course,
                                                ) && (
                                                    <Diary
                                                        onBlur={(value) => {
                                                            updateDiaries(
                                                                value,
                                                                today
                                                                    .toLocaleDateString(),
                                                            );
                                                        }}
                                                        mt='lg'
                                                        date={today
                                                            .toLocaleDateString()}
                                                        diary={diaries[weekDay]
                                                            .diary}
                                                        today
                                                    />
                                                )}
                                            </>
                                        )
                                        : (
                                            <Center>
                                                <Skeleton>
                                                    <SimpleGrid cols={5}>
                                                        {Array.from({
                                                            length: 5,
                                                        }).map(
                                                            (_, i) => (
                                                                <Diary
                                                                    key={i}
                                                                    diary=''
                                                                    date=''
                                                                />
                                                            ),
                                                        )}
                                                    </SimpleGrid>
                                                </Skeleton>
                                            </Center>
                                        )}
                                </DisableProvider>
                            )
                        : (
                            <Alert
                                color='red'
                                icon={<IconAlertTriangle />}
                                title='PJS APIのURLが正しくありません'
                            >
                                設定画面から設定を行ってください
                            </Alert>
                        )
                    : (
                        <Alert
                            color='red'
                            icon={<IconAlertTriangle />}
                            title='PJS APIが設定されていません'
                        >
                            設定画面から設定を行ってください
                        </Alert>
                    )
                : (
                    <Center>
                        <Skeleton>
                            <SimpleGrid cols={5}>
                                {Array.from({ length: 5 }).map(
                                    (_, i) => (
                                        <Diary
                                            key={i}
                                            diary=''
                                            date=''
                                        />
                                    ),
                                )}
                            </SimpleGrid>
                        </Skeleton>
                    </Center>
                )}
        </Container>
    );
}
