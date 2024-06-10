export class HMSObject {
    constructor(
        public h: number,
        public m: number,
        public s: number,
    ) {}
    static fromString(str: `${number}:${number}:${number}`) {
        const items = str.split(':').map((s) => Number(s)) as [
            number,
            number,
            number,
        ];

        return new HMSObject(...items);
    }
    static fromDate(date: Date) {
        return new HMSObject(
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        );
    }
    static fromSeconds(seconds: number) {
        return new HMSObject(
            Math.floor(seconds / 3600),
            Math.floor(seconds / 60),
            seconds % 60,
        );
    }

    toSeconds() {
        return this.h * 3600 + this.m * 60 + this.s;
    }
    toString() {
        return `${zeroPadding(this.h, 2)}:${zeroPadding(this.m, 2)}:${zeroPadding(this.s, 2)}`;
    }

    getDiff(hms: HMSObject) {
        return hms.toSeconds() - this.toSeconds();
    }
}

export class ScheduleList {
    constructor(protected scheduleMap: Record<string, HMSObject>) {}

    getClosestSchedule(filterSchedule: HMSObject, mode: 'after' | 'before') {
        const closest = Object.entries(this.scheduleMap)
            .filter((schedule) => {
                const diff = schedule[1].getDiff(filterSchedule);

                if (mode === 'before' && 0 < diff) {
                    return true;
                } else if (mode === 'after' && diff < 0) {
                    return true;
                } else {
                    return false;
                }
            })
            .reduce((prev: [string, HMSObject] | null, curr) => {
                if (!prev) {
                    return curr;
                }

                const diff = prev[1].getDiff(curr[1]);

                if (mode === 'before' && 0 < diff) {
                    return curr;
                } else {
                    return prev;
                }
            }, null);

        return closest;
    }
}

function zeroPadding(num: number, len: number) {
    return ('0'.repeat(len) + num).slice(-len);
}
