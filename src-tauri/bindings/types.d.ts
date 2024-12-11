export type set_config = (args: {
    newConfig: AppConfig;
}) => {
    Ok: null;
} | {
    Err: string;
};
export type Schedule = {
    name: string;
    time: string;
};
export type reset_config = () => {
    Ok: null;
} | {
    Err: string;
};
export type AppConfig = {
    gas_url: string | null;
    formatter: Array<[string, string]>;
    current_formatter: string;
    advanced: boolean;
    auto_start: boolean;
    schedules: Array<Schedule>;
};
export type update_tray = () => {
    Ok: null;
} | {
    Err: string;
};
export type get_config = () => {
    Ok: AppConfig;
} | {
    Err: string;
};
export interface Commands {
    set_config: set_config;
    reset_config: reset_config;
    update_tray: update_tray;
    get_config: get_config;
}
