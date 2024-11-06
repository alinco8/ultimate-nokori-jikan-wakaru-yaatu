import type { StoryObj } from '@storybook/react';
import { FormatterTable } from './FormatterTable';

export default {
    title: 'FormatterTable',
    component: FormatterTable,
};

type Story = StoryObj<typeof FormatterTable>;

export const Primary: Story = {
    args: {
        formatter: {
            'formatter1': 'formatter1',
            'formatter2': 'formatter2',
            'formatter3': 'formatter3',
        },
        current: 'formatter1',

        disabled: false,

        onCurrentChange: (name: string) => {
            console.log(name);
        },
    },
};
