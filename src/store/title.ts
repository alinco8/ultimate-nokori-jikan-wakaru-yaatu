import { create } from 'zustand';

export interface TitleStore {
    title: string;
    setTitle(title: string): void;
}

export const useTitleStore = create<TitleStore>((set) => ({
    title: 'main',
    setTitle(title) {
        set({ title });
    },
}));
