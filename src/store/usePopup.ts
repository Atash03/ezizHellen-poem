import { create } from 'zustand';

interface Props {
  mode: string;
  setMode: (val: string) => void;
}

export const usePopupStore = create<Props>((set) => ({
  mode: '',
  setMode: (val) => set(() => ({ mode: val })),
}));
