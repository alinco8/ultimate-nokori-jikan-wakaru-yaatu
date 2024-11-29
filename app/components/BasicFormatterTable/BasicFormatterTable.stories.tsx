import type { StoryObj } from '@storybook/react';
import { BasicFormatterTable } from './BasicFormatterTable';

export default {
    title: 'FormatterTable',
    component: BasicFormatterTable,
};

type Story = StoryObj<typeof BasicFormatterTable>;

export const Primary: Story = {
    args: {
        formatter: [
            ['formatter1', 'formatter1'],
            ['formatter2', 'formatter2'],
            ['formatter3', 'formatter3'],
        ],
        current: 'formatter1',

        disabled: false,

        onCurrentChange: (name: string) => {
            console.log(name);
        },
    },
};
