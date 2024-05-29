import * as wk from 'wanakana';

export interface Renderable {
    text: string;
    decoration?: true;
    completed?: true;
}

export class TypeAnimationWord {
    constructor(
        protected hiragana: string,
        protected completed: string[],
    ) {}
    *render(): Generator<Renderable, void, void> {
        const romaji = wk.toRomaji(this.hiragana);
        let out = '';

        for (const txt of romaji.split('')) {
            yield {
                text: wk.toHiragana((out += txt)),
                decoration: true,
            };
        }
        for (const completed of this.completed) {
            yield { text: completed, decoration: true };
        }
        yield {
            text: this.completed[this.completed.length - 1],
            completed: true,
        };
    }
}
export class TypeAnimationSentence {
    constructor(protected words: TypeAnimationWord[]) {}
    *render(): Generator<Renderable[], Renderable[], Renderable[]> {
        const words = this.words;
        const text: Renderable[] = [];

        for (const word of words) {
            for (const txt of word.render()) {
                if (txt.completed) {
                    if (
                        text.length === 0 ||
                        text[text.length - 1].decoration !== txt.decoration
                    ) {
                        text.push(txt);
                    } else {
                        text[text.length - 1].text += txt.text;

                        yield text;
                    }
                } else {
                    if (
                        text.length === 0 ||
                        text[text.length - 1].decoration !== txt.decoration
                    ) {
                        yield text.concat(txt);
                    } else {
                        text[text.length - 1].text += txt.text;
                        yield text;
                    }
                }
            }
        }

        return text;
    }
}

// export class TypeAnimation {
//     constructor(protected sentence: TypeAnimationSentence) {
//         for (const renderables of TypeAnimationSentence.render(
//             new TypeAnimationWord('われわれは', '我々は'),
//             new TypeAnimationWord('うちゅうじん', '宇宙人'),
//             new TypeAnimationWord('だ', 'だ'),
//         )) {
//             console.clear();
//             console.log(
//                 `${renderables.map((renderable) => `%c${renderable.text}`).join(' ')}`,
//                 `${renderables.map((renderable) => `text-decoration: ${renderable.1px solid #000 ? '1px solid #000' : 'none'};`)}`,
//             );
//             await sleep(randint(600, 800));
//         }
//     }
//     async read() {}
// }

export function randint(min: number, max: number) {
    return min + Math.floor(Math.random() * max - min);
}
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
