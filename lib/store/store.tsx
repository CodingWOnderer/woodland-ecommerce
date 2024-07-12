import { create, useStore } from "zustand";
import { FilterStore, ZustandStoreProps } from "./types";
import InMemoryStoreSlice from "./slices/InMemorySlice";
import filterSlice from "./slices/filterSlice";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CartState,
  cartStoreSlice,
  UserState,
  useUserStore,
} from "./slices/persistedSlice";

const partialize = (
  state: ZustandStoreProps & FilterStore & CartState & UserState
) => ({
  items: state.items,
  addItemToCart: state.addItemToCart,
  removeItemFromCart: state.removeItemFromCart,
  adjustQuantity: state.adjustQuantity,
  updateCartItem: state.updateCartItem,
  clearCart: state.clearCart,
  user: state.user,
  addUser: state.addUser,
  removeUser: state.removeUser,
});

const woodlandStore = create<
  ZustandStoreProps & FilterStore & CartState & UserState
>()(
  persist(
    (...a) => ({
      ...InMemoryStoreSlice(...a),
      ...filterSlice(...a),
      ...cartStoreSlice(...a),
      ...useUserStore(...a),
    }),
    {
      name: "woodland-storage",
      storage: createJSONStorage(() => localStorage),
      partialize,
    }
  )
);

const useWoodlandStoreData = () => useStore(woodlandStore);

export default useWoodlandStoreData;
