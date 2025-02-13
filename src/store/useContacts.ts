import { create } from "zustand";

interface Props {
  success: boolean;
  setSuccess: (val: boolean) => void;
}

export const useContactsStore = create<Props>((set) => ({
  success: false,
  setSuccess: (value) => set((state) => ({ success: (state.success = value) })),
}));
