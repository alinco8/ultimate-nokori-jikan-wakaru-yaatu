import type { StoryObj } from '@storybook/react';
import { FormatterTable } from './FormatterTable';

export default {
    title: 'FormatterTable',
    component: FormatterTable,
};

type Story = StoryObj<typeof FormatterTable>;

export const Primary: Story = {
    args: {},
};
