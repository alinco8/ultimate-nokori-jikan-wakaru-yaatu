import { Card, Group, ScrollArea, Title } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { WithHeader } from '~/components/Header';
import { Markdown } from '~/components/Markdown';

export const meta: MetaFunction = () => {
    return [{ title: 'Update' }, { name: 'description', content: '' }];
};

export default function Update() {
    return (
        <WithHeader>
            <Card radius='lg' shadow='sm' padding='lg' withBorder>
                <Group>
                    <Title mb='md'>v1.0.0</Title>
                    <ScrollArea h={400}>
                        <Markdown
                            content={`
## ✨️ 新機能

-   機能 1
-   機能 2
-   機能 3
-   機能 4

## 🔧 バグ修正

-   修正 1
-   修正 2
-   修正 3
-   修正 4

## 💎 改善点

-   修正 1
-   修正 2
-   修正 3
-   修正 4

# GFM

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, nemo!

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

## Summary
<details>
<summary>これは中身が整形されない</summary>
1. 野菜**A**の皮を剥く。
2. 乱切りにする。
3. 調味料**B**と合わせて炒める。
    - \`火傷\`に注意。
</details>

<details>
<summary>これは中身が整形される</summary>

1. 野菜**A**の皮を剥く。
2. 乱切りにする。
3. 調味料**B**と合わせて炒める。
    - \`火傷\`に注意。
</details>

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| :-: | :-: | :-: | :-: |
| a | b  |  c |  d  |
| a | b  |  c |  d  |

## Tasklist

* [ ] to do
* [x] done`}
                        />
                    </ScrollArea>
                </Group>
            </Card>
        </WithHeader>
    );
}
