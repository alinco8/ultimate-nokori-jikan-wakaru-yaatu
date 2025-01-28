import { differenceInDays } from 'date-fns';
import { Cloneable, Operation } from '~/libs/classes';

export class AlphabeticalNumber implements Cloneable, Operation<string> {
    value: number;

    constructor(value: string | number) {
        if (typeof value === 'string') {
            this.value = value.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
        } else {
            this.value = value;
        }
    }

    add(b: string | number | this): this {
        if (typeof b === 'string') {
            const opp = new AlphabeticalNumber(b);
            this.value = opp.value;
        } else if (typeof b === 'number') {
            this.value += b;
        } else {
            this.value += b.value;
        }

        return this;
    }
    sub(b: string | number | this): this {
        if (typeof b === 'string') {
            const opp = new AlphabeticalNumber(b);
            this.value -= opp.value;
        } else if (typeof b === 'number') {
            this.value -= b;
        } else {
            this.value -= b.value;
        }

        return this;
    }
    mul(b: string | number | this): this {
        if (typeof b === 'string') {
            const opp = new AlphabeticalNumber(b);
            this.value *= opp.value;
        } else if (typeof b === 'number') {
            this.value *= b;
        } else {
            this.value *= b.value;
        }

        return this;
    }
    div(b: string | number | this): this {
        if (typeof b === 'string') {
            const opp = new AlphabeticalNumber(b);
            this.value /= opp.value;
        } else if (typeof b === 'number') {
            this.value /= b;
        } else {
            this.value /= b.value;
        }

        return this;
    }

    clone(): this {
        return new AlphabeticalNumber(this.value) as this;
    }
}

export class Cell implements Cloneable, Operation<[number, number]> {
    column: AlphabeticalNumber;
    row: number;

    constructor(str: string);
    constructor(column: number | string, row: number);
    constructor(a: number | string, b?: number) {
        if (b === undefined) {
            if (typeof a === 'number') {
                throw new Error('Invalid cell format');
            } else {
                const matches = a.match(/([A-Z]+)([0-9]+)/);

                if (matches === null) {
                    throw new Error('Invalid cell format');
                }

                this.column = new AlphabeticalNumber(matches[1]);
                this.row = typeof a === 'number' ? a : parseInt(matches[2], 10);
            }
        } else {
            this.column = new AlphabeticalNumber(a);
            this.row = b;
        }
    }

    add(b: number | this | [number, number]): this {
        if (Array.isArray(b)) {
            this.column.value += b[0];
            this.row += b[1];
        } else if (typeof b === 'number') {
            this.row += b;
        } else {
            this.column.value += b.column.value;
            this.row += b.row;
        }

        return this;
    }
    sub(b: number | this | [number, number]): this {
        if (Array.isArray(b)) {
            this.column.value -= b[0];
            this.row -= b[1];
        } else if (typeof b === 'number') {
            this.row -= b;
        } else {
            this.column.value -= b.column.value;
            this.row -= b.row;
        }

        return this;
    }
    mul(b: number | this | [number, number]): this {
        if (Array.isArray(b)) {
            this.column.value *= b[0];
            this.row *= b[1];
        } else if (typeof b === 'number') {
            this.row *= b;
        } else {
            this.column.value *= b.column.value;
            this.row *= b.row;
        }

        return this;
    }
    div(b: number | this | [number, number]): this {
        if (Array.isArray(b)) {
            this.column.value /= b[0];
            this.row /= b[1];
        } else if (typeof b === 'number') {
            this.row /= b;
        } else {
            this.column.value /= b.column.value;
            this.row /= b.row;
        }

        return this;
    }

    toString(): string {
        return `${
            String.fromCharCode('A'.charCodeAt(0) + this.column.value)
        }${this.row.toString()}`;
    }

    clone(): this {
        return new Cell(this.column.value, this.row) as this;
    }
}

export function calcCell(
    date: Date,
    baseDate: Date,
    baseCell: Cell,
    groupHeight: number,
): Cell {
    const diff = differenceInDays(date, baseDate);

    return baseCell.clone().add([
        diff % 7,
        Math.floor(diff / 7) * groupHeight,
    ]);
}

const BASE_DATE = new Date('2024/04/22');
const BASE_CELL = new Cell('B7');
const GROUP_HEIGHT = 10;

export async function getRemoteDiaries(
    gasUrl: string,
    [start, end]: [Date, Date],
    baseDate: Date = BASE_DATE,
    baseCell: Cell = BASE_CELL,
    groupHeight: number = GROUP_HEIGHT,
): Promise<string[]> {
    const startCell = calcCell(start, baseDate, baseCell, groupHeight);
    const endCell = calcCell(end, baseDate, baseCell, groupHeight);

    return fetch(
        `${gasUrl}?range=${startCell.clone().add([0, 9]).toString()}:${
            endCell.clone().add([0, 9]).toString()
        }&sheet=日誌・自主学習`,
    ).then((res) => res.json() as Promise<string[][]>).then((json) => {
        return json[0];
    });
}

export async function setRemoteDiaries(
    gasUrl: string,
    [start, end]: [Date, Date],
    diaries: string[],
    baseDate: Date = BASE_DATE,
    baseCell: Cell = BASE_CELL,
    groupHeight: number = GROUP_HEIGHT,
) {
    const startCell = calcCell(start, baseDate, baseCell, groupHeight);
    const endCell = calcCell(end, baseDate, baseCell, groupHeight);

    await fetch(gasUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
            range: `${startCell.clone().add([0, 9]).toString()}:${
                endCell.clone().add([0, 9]).toString()
            }`,
            sheet: '日誌・自主学習',
            values: [diaries],
        }),
    });
}
