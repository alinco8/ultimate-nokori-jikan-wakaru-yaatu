import { create } from 'zustand';
import { type Schedule } from '../libs/schedule';

export interface ScheduleStore {
    schedules: Schedule[];
    setSchedules(schedules: Schedule[]): void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
    schedules: [],
    setSchedules(schedules) {
        set({ schedules });
    },
}));
