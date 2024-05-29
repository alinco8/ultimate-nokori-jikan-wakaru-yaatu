import { closestTo, isAfter, isBefore } from 'date-fns';

export class Schedule {
    constructor(
        public name: string,
        public date: Date,
    ) {}
}

export class ScheduleList {
    constructor(public list: Schedule[]) {}

    closestSchedule(date: Date, which: 'before' | 'after') {
        return closestTo(
            date,
            this.list
                .map((schedule) => schedule.date)
                .filter((scheduleDate) =>
                    which
                        ? isBefore(scheduleDate, date)
                        : isAfter(scheduleDate, date),
                ),
        );
    }
}
