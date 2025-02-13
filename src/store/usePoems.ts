import { PoemType } from "@/components/shared/poems-item";
import { create } from "zustand";

interface ActiveSort {
  id: string;
  view: string;
}

interface Props {
  activeSort: ActiveSort;
  setActiveSort: (value: ActiveSort) => void;

  favorites: PoemType[];
  setFavorites: (obj: PoemType) => void;
}

export const usePoemsStore = create<Props>()((set) => ({
  activeSort: {
    id: "new",
    view: "Snaçala nowye",
  },
  favorites: [],

  setActiveSort: (value) => set(() => ({ activeSort: value })),

  setFavorites: (obj) => {
    set((state) => {
      const isFavorite = state.favorites.some((item) => item.id === obj.id);

      return {
        favorites: isFavorite
          ? state.favorites.filter((favorite) => favorite.id !== obj.id)
          : [...state.favorites, obj],
      };
    });
  },
}));
