// @ts-check
import ansiRegex from 'ansi-regex';
import { spawnSync } from 'child_process';

/**
 * @type {string}
 */
const data = await new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    process.stdin.on('data', chunk => chunks.push(chunk));
    process.stdin.on(
        'end',
        () => resolve(Buffer.concat(chunks).toString('utf8')),
    );
});

const paths = data.replace(ansiRegex(), '').split('\n').flatMap(
    line => {
        const match = line.match(
            /^from (.+):/,
        );
        return match?.[1] ?? [];
    },
);

console.log('Paths to format:', paths);

if (paths.length !== 0) {
    spawnSync('git', [
        'add',
        ...paths,
    ]);
}
