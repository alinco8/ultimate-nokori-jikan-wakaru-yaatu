import { Route } from '.react-router/types/app/+types/root';
import {
    ActionIcon,
    Card,
    Grid,
    Skeleton,
    Text,
    Textarea,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { useDiary } from '~/hooks/useDiaries';

export const meta: Route.MetaFunction = () => {
    return [{ title: '日誌' }, { name: 'description', content: '' }];
};

export type Diaries = { diary: string; date: string }[];

export default function DiaryPage() {
    const [currentDate, setCurrentDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    );
    const { diary, mutation } = useDiary(currentDate);

    const addDate = (days: number) => {
        setCurrentDate(format(
            addDays(currentDate, days),
            'yyyy-MM-dd',
        ));
    };

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        console.log(
            diary.data,
            e.currentTarget.value,
        );

        if (diary.data !== e.currentTarget.value) {
            mutation.mutate({
                date: new Date(currentDate),
                diary: e.currentTarget.value,
            });
        }
    };

    return (
        <Grid>
            <Grid.Col span={1}>
                <ActionIcon
                    variant='subtle'
                    size='lg'
                    onClick={() => {
                        addDate(-1);
                    }}
                >
                    <IconChevronLeft />
                </ActionIcon>
            </Grid.Col>
            <Grid.Col span={10}>
                <Card withBorder shadow='sm' padding='md'>
                    <Card.Section withBorder inheritPadding>
                        <Text fw={500}>
                            {currentDate}
                        </Text>
                    </Card.Section>
                    <Skeleton
                        visible={diary.isLoading}
                    >
                        <Textarea
                            rows={20}
                            disabled={diary.isFetching
                                || mutation.isPending}
                            key={`textarea-${currentDate}`}
                            defaultValue={diary.isPending ? '' : diary.data}
                            onBlur={onBlur}
                        />
                    </Skeleton>
                </Card>
            </Grid.Col>
            <Grid.Col span={1}>
                <ActionIcon
                    variant='subtle'
                    size='lg'
                    onClick={() => {
                        addDate(1);
                    }}
                >
                    <IconChevronRight />
                </ActionIcon>
            </Grid.Col>
        </Grid>
    );
}
