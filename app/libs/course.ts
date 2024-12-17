import { addDays } from 'date-fns';
import { Course } from 'src-tauri/bindings/types';

export function course2num(str: Course) {
    switch (str) {
        case 'One':
            return 1;
        case 'Three':
            return 3;
        case 'Five':
            return 5;
    }
}
export function sliceByCourse<T>(
    arr: T[],
    course: Course,
): T[] {
    switch (course) {
        case 'One':
            return [arr[3]];
        case 'Three':
            return [arr[0], arr[2], arr[4]];
        case 'Five':
            return arr;
    }
}
export function checkTodayByDate(
    today: string,
    weekStart: string,
    course: Course,
) {
    switch (course) {
        case 'One':
            return today === addDays(weekStart, 3).toLocaleDateString();
        case 'Three':
            return today === addDays(weekStart, 0).toLocaleDateString()
                || today === addDays(weekStart, 2).toLocaleDateString()
                || today === addDays(weekStart, 4).toLocaleDateString();
        case 'Five':
            return today === addDays(weekStart, 0).toLocaleDateString()
                || today === addDays(weekStart, 1).toLocaleDateString()
                || today === addDays(weekStart, 2).toLocaleDateString()
                || today === addDays(weekStart, 3).toLocaleDateString()
                || today === addDays(weekStart, 4).toLocaleDateString();
    }
}
