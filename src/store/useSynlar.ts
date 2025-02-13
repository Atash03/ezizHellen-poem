import { create } from 'zustand';

export interface ActiveSort {
  id: string;
  view: string;
}

interface Props {
  activeSort: ActiveSort;
  setActiveSort: (value: ActiveSort) => void;
}

export const useSynlarStore = create<Props>((set) => ({
  activeSort: {
    id: 'new',
    view: 'Snaçala nowye',
  },
  setActiveSort: (value: ActiveSort) =>
    set((state) => ({ activeSort: (state.activeSort = value) })),
}));
