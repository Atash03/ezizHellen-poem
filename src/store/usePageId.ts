import { create } from "zustand";

interface Props {
  activeId: number;
  setActiveId: (num: number) => void;
}

export const usePageIdStore = create<Props>()((set) => ({
  activeId: 1,
  setActiveId: (num) => set((state) => ({ activeId: (state.activeId = num) })),
}));
