import { create, useStore } from "zustand";
import { FilterStore, ZustandStoreProps } from "./types";
import InMemoryStoreSlice from "./slices/InMemorySlice";
import filterSlice from "./slices/filterSlice";

const woodlandStore = create<ZustandStoreProps& FilterStore>()((...a)=>({
    ...InMemoryStoreSlice(...a),
    ...filterSlice(...a),
  }));
  
  const useWoodlandStoreData = () => useStore(woodlandStore);
  
  export default useWoodlandStoreData;