import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import { ScheduleMap, ScheduleTime } from './libs/scheduleMap';

const scheduleMap = new ScheduleMap('school', {
    朝礼: ScheduleTime.fromStr('9:30:00'),
    '1限目': ScheduleTime.fromStr('9:45:00'),
    休憩1: ScheduleTime.fromStr('10:35:00'),
    '2限目': ScheduleTime.fromStr('10:45:00'),
    休憩2: ScheduleTime.fromStr('11:35:00'),
    '3限目': ScheduleTime.fromStr('11:45:00'),
    昼休憩: ScheduleTime.fromStr('12:35:00'),
    '4限目': ScheduleTime.fromStr('13:15:00'),
    休憩4: ScheduleTime.fromStr('14:05:00'),
    '5限目': ScheduleTime.fromStr('14:15:00'),
    休憩5: ScheduleTime.fromStr('15:05:00'),
    '6限目': ScheduleTime.fromStr('15:15:00'),
    終礼: ScheduleTime.fromStr('16:05:00'),
    放課後: ScheduleTime.fromStr('16:15:00'),
});

export const App = () => {
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const now = ScheduleTime.fromDate(new Date());

            const schedule = scheduleMap.getAfterSchedule(now);
            const current = scheduleMap.getCurrentSchedule(now);

            // await invoke('updateTitle', {
            //     title: schedule
            //         ? `${schedule[0]}まで ${schedule[1].toString()} ${ScheduleTime.fromSeconds(schedule[1].getDiff(now).toSeconds()).toString('mm:ss')}`
            //         : '予定はありません',
            // });
            await invoke('update_title', {
                title: schedule
                    ? `現在:${current ? current[0] : 'なし'}　${schedule[0]}まで${ScheduleTime.fromSeconds(schedule[1].getDiff(now).toSeconds()).toString('mm:ss')}`
                    : '予定はありません',
            });
        }, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>404</h1>
            <div>Not Found</div>
        </div>
    );
};

export default App;
