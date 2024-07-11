"use client";
import { type StateCreator } from "zustand";
import { IManufacturingInfo, ZustandStoreProps } from "../types";

const InMemoryStoreSlice: StateCreator<ZustandStoreProps> = (set) => ({
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
  filterSheet: false,
  setFilterSheet: (value: boolean) => set({ filterSheet: value }),

  sizeSheet: false,
  setSizeSheet: (value: boolean) => set({ sizeSheet: value }),

  division: "FOOTWEAR",
  setDivision: (value: "FOOTWEAR" | "GARMENT") => set({ division: value }),

  infoSheet: false,
  setInfoSheet: (values: boolean) => set({ infoSheet: values }),

  productManufacturingData: undefined,
  setManufacturingInfo: (value: Partial<IManufacturingInfo>) =>
    set({ productManufacturingData: value }),

  zoomDialouge: false,
  setZoomDialouge: (value: boolean) => set({ zoomDialouge: value }),
});

export default InMemoryStoreSlice;
