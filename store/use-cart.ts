import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  hydrate: () => void;
};

const STORAGE_KEY = "nova-cart";

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  hydrate: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      set({ items: JSON.parse(stored) });
    }
  },

  addItem: (item) => {
    const state = get();

    const existing = state.items.find((i) => i.id === item.id);

    let updated;

    if (existing) {
      updated = state.items.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updated = [...state.items, item];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
  },

  removeItem: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
}));