import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface CartItem {
  id: string;
  name?: string;
  price?: number | null;
  quantity: number;
  size?: string;
  color?: string;
  imageURL?: string;
}

export interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  adjustQuantity: (id: string, quantity: number) => void;
  updateCartItem: (item: Partial<CartItem> & { id: string }) => void;
  clearCart: () => void;
}

export interface UserState {
  user: string | null;
  addUser: (user: string | null) => void;
  removeUser: () => void;
}

export const cartStoreSlice: StateCreator<CartState> = (set) => ({
  items: [],
  addItemToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: item.quantity, size: item.size }
              : i
          ),
        };
      } else {
        return { items: [...state.items, item] };
      }
    }),
  removeItemFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  adjustQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    })),
  updateCartItem: (item) =>
    set((state) => ({
      items: state.items.map((existingItem) =>
        existingItem.id === item.id
          ? { ...existingItem, ...item }
          : existingItem
      ),
    })),
  clearCart: () => set({ items: [] }),
});

export const useUserStore: StateCreator<UserState> = (set) => ({
  user: null,
  addUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
});
