import { invoke } from '~/libs/invoke';
import { format, differenceInCalendarDays } from 'date-fns';

export async function getDiary() {
    const config = await invoke('get_config');
    await invoke('set_config', {
        newConfig: {
            ...config,
            gas_url:
                'https://script.google.com/macros/s/AKfycbwIyttpQFg27Wkw5v1SQpm1pnoBIHrcdvHgb4vbrHw5eF5iIcBRXSe_jICKtVXJcbR0DQ/exec?sheet=日誌・自主学習&range=B7:F506',
        },
    });
    console.log(await invoke('get_config'));
}

export class CellPos {
    constructor(public x: number, public y: number) {}

    toString() {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${num2alphabet(this.x)}${this.y}`;
    }

    add(other: CellPos): CellPos;
    add(x: number, y: number): CellPos;
    add(otherOrNum: CellPos | number, num2?: number) {
        return new CellPos(
            this.x + (typeof otherOrNum === 'number' ? otherOrNum : otherOrNum.x),
            this.y + (otherOrNum instanceof CellPos ? otherOrNum.y : num2 || 0)
        );
    }
}

const START_CELL = new CellPos(2, 7);
const START_DATE = new Date(2024, 4, 22, 9, 0, 0, 0);
START_DATE.setMonth(START_DATE.getMonth() - 1);

export function calcTodayDiaryCell(): CellPos {
    const today = new Date(2024, 9, 30);
    today.setHours(9, 0, 0, 0);

    const diff = differenceInCalendarDays(today, START_DATE);

    const x = diff % 7;
    const y = Math.floor(diff / 7) * 10 + 9;

    console.log(
        `${format(today, 'yyyy/MM/dd HH:mm:ss')} - ${format(START_DATE, 'yyyy/MM/dd HH:mm:ss')} = ${diff.toString()}`
    );

    return START_CELL.add(x, y);
}

function num2alphabet(num: number) {
    let result = '';
    while (num > 0) {
        num--;
        result = String.fromCharCode((num % 26) + 65) + result;
        num = Math.floor(num / 26);
    }
    return result;
}
