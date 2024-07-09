import { type StateCreator } from "zustand";
import { FilterStore, Color, Size } from "../types";



const filterSlice: StateCreator<FilterStore> =   (set) => ({
  colorFilter: [],
  sizeFilter: [],
  priceFilter: "",
  setColorFilter: (newColorFilter: Color[]) =>
    set({ colorFilter: newColorFilter }),
  setSizeFilter: (newSizeFilter: Size[]) => set({ sizeFilter: newSizeFilter }),
  setPriceFilter: (newPriceFilter: string) =>
    set({ priceFilter: newPriceFilter }),
});

export default filterSlice;
