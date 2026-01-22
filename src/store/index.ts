import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  image?: string;
}

interface Store {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
}));