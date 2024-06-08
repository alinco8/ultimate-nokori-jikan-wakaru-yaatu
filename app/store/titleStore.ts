import { create } from 'zustand';

export interface TitleStore {
    title: string;
    setTitle(title: string): void;
}

export const useTitleStore = create<TitleStore>((set) => ({
    title: '',
    setTitle(title) {
        set({ title });
    },
}));
