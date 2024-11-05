import type { AppConfig } from '../src-tauri/bindings/greet';

declare namespace Commands {
    export interface Commands {
        get_config(): AppConfig;
        set_config(args: { newConfig: AppConfig }): void;
        update_tray(): void;
    }

    interface Config {
        mode: ScheduleMode;
        schedules: Schedule[];
        gas_url: string | null;
    }

    interface Schedule {
        name: string;
        time: string;
    }

    type ScheduleMode = 'compact' | 'normal';
}
