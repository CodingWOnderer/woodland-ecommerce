"use client";
import { create, useStore, type StateCreator } from "zustand";

type ZustandStoreProps = {
  storeSheet: boolean;
  toggleStore: (value: boolean) => void;
  sidebar: boolean;
  toggleSidebar: (value: boolean) => void;
  searchSheet: boolean;
  searchProduct: string;
  setSearch: (value: string) => void;
  toggleSearchSheet: (value: boolean) => void;
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
});

const woodlandStore = create<ZustandStoreProps>()(woodlandStoreCreator);

const useWoodlandStoreData = () => useStore(woodlandStore);

export default useWoodlandStoreData;
