import type { StoryObj } from '@storybook/react';
import { FormatterTableTextarea } from './FormatterTableTextarea';

export default {
    title: 'FormatterTableTextarea',
    component: FormatterTableTextarea,
};

type Story = StoryObj<typeof FormatterTableTextarea>;

export const Primary: Story = {
    args: {},
};
