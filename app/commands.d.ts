declare namespace Commands {
    export interface Commands {
        get_config(): Config;
        set_config(config: Config): void;
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
