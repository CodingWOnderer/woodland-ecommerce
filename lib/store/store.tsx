"use client";
import { create, useStore, type StateCreator } from "zustand";

interface AuthForm {
  userPhone: string;
  verifyForm: boolean;
  setVerifyForm: (value: boolean) => void;
  setUserPhone: (value: string) => void;
  setAuthSheet: boolean;
  toggleAuthSheet: (value: boolean) => void;
}

type ZustandStoreProps = {
  storeSheet: boolean;
  toggleStore: (value: boolean) => void;
  sidebar: boolean;
  toggleSidebar: (value: boolean) => void;
  searchSheet: boolean;
  searchProduct: string;
  setSearch: (value: string) => void;
  toggleSearchSheet: (value: boolean) => void;

  authForm: AuthForm;
};

const woodlandStoreCreator: StateCreator<ZustandStoreProps> = (set) => ({
  storeSheet: false,
  toggleStore: (value: boolean) => set({ storeSheet: value }),
  sidebar: false,
  toggleSidebar: (value: boolean) => set({ sidebar: value }),
  searchSheet: false,
  toggleSearchSheet: (value: boolean) => set({ searchSheet: value }),
  searchProduct: "",
  setSearch: (value: string) => set({ searchProduct: value }),

  authForm: {
    userPhone: "",
    setAuthSheet: false,
    verifyForm: false,
    setVerifyForm: (value: boolean) =>
      set((state) => ({ authForm: { ...state.authForm, verifyForm: value } })),
    setUserPhone: (value: string) =>
      set((state) => ({ authForm: { ...state.authForm, userPhone: value } })),
    toggleAuthSheet: (value: boolean) =>
      set((state) => ({
        authForm: { ...state.authForm, setAuthSheet: value },
      })),
  },
});

const woodlandStore = create<ZustandStoreProps>()(woodlandStoreCreator);

const useWoodlandStoreData = () => useStore(woodlandStore);

export default useWoodlandStoreData;
