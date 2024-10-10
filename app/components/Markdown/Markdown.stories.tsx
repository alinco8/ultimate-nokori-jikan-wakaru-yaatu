import type { StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

export default {
    title: 'Markdown',
    component: Markdown,
};

type Story = StoryObj<typeof Markdown>;

export const Primary: Story = {
    args: {
        content:
            '# v1.1.0\n\n## ✨ 新機能\n\n-  機能 1\n-   機能 2\n-   機能 3\n-   機能 4\n\n## 🔧 バグ修正\n\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4\n\n## 💎 改善点\n\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4\n\n# v1.0.0\n\nなんか説明文\n\n## ✨️ 新機能\n\n-   機能 1\n-   機能 2\n-   機能 3\n-   機能 4\n\n## 🔧 バグ修正\n\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4\n\n## 💎 改善点\n\n-   修正 1\n-   修正 2\n-   修正 3\n-   修正 4\n',
    },
};
