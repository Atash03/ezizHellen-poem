import { create } from "zustand";

interface Props {
  path: "poem" | "moment" | "";
  setPath: (val: "poem" | "moment" | "") => void;
}

export const usePathStore = create<Props>((set) => ({
  path: "",
  setPath: (val) => set((state) => ({ path: (state.path = val) })),
}));
