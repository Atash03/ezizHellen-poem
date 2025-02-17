import { create } from "zustand";

interface Props {
  active: boolean;
  mobActive: boolean;

  status: "forgot" | "reset" | "initial";
  setStatus: (value: "forgot" | "reset" | "initial") => void;

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

  status: "initial",
  setStatus: (value: "forgot" | "reset" | "initial") => set({ status: value }),

  loginError: "",
  setLoginError: (er) => set({ loginError: er }),

  registerError: "",
  setRegisterError: (er) => set({ loginError: er }),

  loginSuccess: false,
  setLoginSuccess: (val) => set(() => ({ loginSuccess: val })),

  setActive: (val) => set(() => ({ active: val })),
  setMobActive: (val) => set(() => ({ mobActive: val })),
}));
