import { type StateCreator } from "zustand";
import { FilterStore, Color, Size } from "../types";

const filterSlice: StateCreator<FilterStore> =   (set) => ({
  colorFilter: [
    { name: "WHITE", code: "#FFFFFF", selected: false },
    { name: "BLUE", code: "#0000FF", selected: false },
    { name: "MAROON", code: "#800000", selected: false },
    { name: "CAMOUFLAGE", code: "#78866B", selected: false },
    { name: "OLIVE", code: "#808000", selected: false },
    { name: "BLACK", code: "#000000", selected: false },
    { name: "PURPLE", code: "#800080", selected: false },
    { name: "BROWN", code: "#A52A2A", selected: false },
    { name: "GREEN", code: "#008000", selected: false },
    { name: "GREY", code: "#808080", selected: false },
    { name: "PINK", code: "#FFC0CB", selected: false },
    { name: "ORANGE", code: "#FFA500", selected: false },
    { name: "YELLOW", code: "#FFFF00", selected: false },
    { name: "NAVY", code: "#000080", selected: false },
    { name: "TAN", code: "#D2B48C", selected: false },
    { name: "RED", code: "#FF0000", selected: false },
  ],
  sizeFilter: [
    "26", "28", "30", "32", "33", "34", "35", "36", "37", "38", "39",
    "40", "41", "42", "43", "44", "45", "46", "47", "XS", "S", "M", 
    "L", "XL", "XXL", "2X",
  ].map(size => ({ size, selected: false })),
  priceFilter: "",
  setColorFilter: (newColorFilter: Color[]) =>
    set({ colorFilter: newColorFilter }),
  setSizeFilter: (newSizeFilter: Size[]) => set({ sizeFilter: newSizeFilter }),
  setPriceFilter: (newPriceFilter: string) =>
    set({ priceFilter: newPriceFilter }),
});

export default filterSlice;
