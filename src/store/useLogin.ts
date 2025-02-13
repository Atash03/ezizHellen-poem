import { create } from 'zustand';

interface Props {
  active: boolean;
  mobActive: boolean;

  loginError: string;
  setLoginError: (er: string) => void;

  registerError: string;
  setRegisterError: (er: string) => void;

  loginSuccess: boolean;
  setLoginSuccess: (val: boolean) => void;

  setActive: (val: boolean) => void;
  setMobActive: (val: boolean) => void;
}

export const useLoginStore = create<Props>((set) => ({
  active: false,
  mobActive: false,

  loginError: '',
  setLoginError: (er) => set({ loginError: er }),

  registerError: '',
  setRegisterError: (er) => set({ loginError: er }),

  loginSuccess: false,
  setLoginSuccess: (val) => set(() => ({ loginSuccess: val })),

  setActive: (val) => set(() => ({ active: val })),
  setMobActive: (val) => set(() => ({ mobActive: val })),
}));
