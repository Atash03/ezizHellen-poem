import { create } from "zustand";

interface IIMageSrc {
  src: string | undefined;
  setSrc: (value: string | undefined) => void;
}

export const useImageSrc = create<IIMageSrc>((set) => ({
  src: "",
  setSrc: (value: string | undefined) => set({ src: value }),
}));
