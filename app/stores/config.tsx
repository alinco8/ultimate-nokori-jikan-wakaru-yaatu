import { AppConfig } from 'src-tauri/bindings/types';
import { create } from 'zustand';

export interface ConfigStore {
    config: AppConfig | null;
    loading: boolean;

    setConfig: (
        func: () => Promise<AppConfig | null>,
    ) => Promise<void>;
}

export const useConfigStore = create<ConfigStore>((set) => {
    return {
        config: null,
        loading: false,

        async setConfig(func) {
            set({ loading: true });
            set({ config: await func() });
            set({ loading: false });
        },
    };
});
