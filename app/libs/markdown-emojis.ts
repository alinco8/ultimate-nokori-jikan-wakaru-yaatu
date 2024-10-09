import { Root } from 'mdast';
import { findAndReplace } from 'mdast-util-find-and-replace';
import { u } from 'unist-builder';

declare module 'unified' {
    interface Data {
        htmlVoidElements?: Array<string> | undefined;
    }
}

export function remarkEmojis() {
    return function (tree: Root) {
        findAndReplace(tree, [/[0-9]/g, (emoji) => ({ type: 'emoji', attributes: { text: emoji } })]);
    };
}

export function EmojiHandler(node: State) {
    console.log(node);

    return {
        type: 'element' as const,
        tagName: 'span',
        properties: {
            className: 'tag',
            style: 'color: red;',
        },
        children: [u('text', node)],
    };
}
