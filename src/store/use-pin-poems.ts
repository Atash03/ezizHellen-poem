import { PoemType } from '@/components/shared/poems-item';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  pinPoems: PoemType[];
  setPinPoems: (poem: PoemType) => void;
}

export const usePinPoemsStore = create<Store>()(
  persist(
    (set) => ({
      pinPoems: [],
      setPinPoems: (poem) => {
        set((state) => {
          const isPinned = state.pinPoems.some((item) => item.id === poem.id);

          return {
            pinPoems: isPinned
              ? state.pinPoems.filter((item) => item.id !== poem.id)
              : [...state.pinPoems, poem],
          };
        });
      },
    }),
    {
      name: 'pin-poems',
    },
  ),
);
