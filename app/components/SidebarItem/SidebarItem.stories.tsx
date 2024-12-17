import type { StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';

export default {
    title: 'SidebarItem',
    component: SidebarItem,
};

type Story = StoryObj<typeof SidebarItem>;

export const Primary: Story = {
    args: {},
};
