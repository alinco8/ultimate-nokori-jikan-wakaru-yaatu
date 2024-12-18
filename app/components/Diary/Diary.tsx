import { Card, CardProps, Flex, Group, Text, Textarea } from '@mantine/core';
import { useDisabled } from '~/contexts/disabled';

export type DiaryProps =
    & {
        date: string;
        diary: string;
        today?: boolean;
        empty?: boolean;
        onBlur?: (value: string) => void;
    }
    & CardProps;
export const Diary = (
    { date, diary, onBlur, today, empty, ...props }: DiaryProps,
) => {
    const { isDisabled } = useDisabled();

    return (
        <Card
            withBorder
            radius='md'
            {...(empty
                ? {
                    bg: 'transparent',
                    style: {
                        borderStyle: 'dashed',
                    },
                }
                : {
                    shadow: 'md',
                })}
            {...props}
        >
            {empty
                ? null
                : (
                    <>
                        <Card.Section withBorder inheritPadding py='xs'>
                            <Flex justify='space-between'>
                                <Text>{date}</Text>
                            </Flex>
                        </Card.Section>
                        <Group>
                            <Textarea
                                disabled={isDisabled}
                                w='100%'
                                styles={{
                                    input: {
                                        height: today ? '30rem' : '7rem',
                                    },
                                }}
                                defaultValue={diary}
                                onBlur={(e) => {
                                    onBlur?.(e.target.value);
                                }}
                            />
                        </Group>
                    </>
                )}
        </Card>
    );
};
