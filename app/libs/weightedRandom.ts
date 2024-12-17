import { Decimal } from 'decimal.js';

export function weightedRandom(
    table: Record<string, number>,
): { key: string; chance: string } {
    const total = Object.values(table).reduce((a, b) => a + b, 0);
    const rand = Math.random() * total;
    let chance = 0;

    for (const key in table) {
        chance += table[key];

        if (rand < chance) {
            return {
                key,
                chance: formatNumber(
                    new Decimal(table[key]).div(total).mul(100),
                ),
            };
        }
    }

    throw new Error('weightedRandom: table is empty');
}

export function formatNumber(n: Decimal): string {
    if (n.lessThan(1)) {
        return n.toFixed(9);
    } else {
        return n.toFixed(1);
    }
}
