import type { StoryObj } from '@storybook/react';
import { Update } from './Update';

export default {
    title: 'Update',
    component: Update,
};

type Story = StoryObj<typeof Update>;

export const Primary: Story = {
    args: {
        version: '1.0.0',
        description:
            `## ✨️ 新機能\n-   機能 1\n-   機能 2\n-   機能 3\n-   機能 4\n## 🔧 バグ修正\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4\n## 💎 改善点\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4`,
    },
};
