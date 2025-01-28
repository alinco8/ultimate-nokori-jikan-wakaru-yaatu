import type { StoryObj } from '@storybook/react';
import { Link } from './Link';

export default {
    title: 'Link',
    component: Link,
};

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
    args: {},
};
