export class ScheduleTime {
    constructor(
        public h: number,
        public m: number,
        public s: number,
    ) {}

    static fromStr(str: string) {
        const times = str.split(':').map((v) => Number(v)) as [
            number,
            number,
            number,
        ];
        return new ScheduleTime(...times);
    }

    static fromDate(date: Date) {
        return new ScheduleTime(
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        );
    }
    static fromSeconds(seconds: number) {
        const hour = Math.floor(seconds / 3600);
        const minute = Math.floor((seconds - hour * 3600) / 60);
        const second = seconds - hour * 3600 - minute * 60;

        return new ScheduleTime(hour, minute, second);
    }

    getDiff(schedule: ScheduleTime) {
        return ScheduleTime.fromSeconds(
            this.toSeconds() - schedule.toSeconds(),
        );
    }

    toSeconds() {
        return (this.h * 60 + this.m) * 60 + this.s;
    }
    toString(str?: string) {
        str ||= 'hh:mm:ss';

        return str
            .replace(/hh/, zeroPadding(this.h, 2))
            .replace(/mm/, zeroPadding(this.m, 2))
            .replace(/ss/, zeroPadding(this.s, 2));
    }
}

export class ScheduleMap {
    constructor(
        public name: string,
        public scheduleList: Record<string, ScheduleTime>,
    ) {}

    getCurrentSchedule(time: ScheduleTime) {
        return Object.entries(this.scheduleList).reduce(
            (current: [string, ScheduleTime] | null, schedule) => {
                if (0 < schedule[1].getDiff(time).toSeconds()) {
                    return current;
                }
                if (
                    !current ||
                    current[1].getDiff(time).toSeconds() <
                        schedule[1].getDiff(time).toSeconds()
                ) {
                    return schedule;
                } else {
                    return current;
                }
            },
            null,
        );
    }
    getAfterSchedule(time: ScheduleTime) {
        return Object.entries(this.scheduleList).reduce(
            (after: [string, ScheduleTime] | null, schedule) => {
                if (schedule[1].getDiff(time).toSeconds() < 0) {
                    return after;
                }
                if (
                    !after ||
                    schedule[1].getDiff(time).toSeconds() <
                        after[1].getDiff(time).toSeconds()
                ) {
                    return schedule;
                } else {
                    return after;
                }
            },
            null,
        );
    }
}

function zeroPadding(number: number, zeroCount: number) {
    return ('0'.repeat(zeroCount) + number).slice(-zeroCount);
}
