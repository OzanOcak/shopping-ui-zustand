import { StateCreator } from "zustand";
import { CartProduct } from "@/types/cartProduct";
import { Product } from "@/types/product";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find(
        (p: Product) => p.id === product.id
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.products.push({ ...product, qty: 1 });
      }
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product: Product) => product.id !== productId
      );
    }),
  incQty: (productId) =>
    set((state) => {
      const product = state.products.find((p: Product) => p.id === productId);
      if (product) {
        product.qty += 1;
      }
    }),
  decQty: (productId) =>
    set((state) => {
      const product = state.products.find((p: Product) => p.id === productId);
      if (product) {
        if (product.qty > 1) {
          product.qty -= 1;
        } else {
          state.products = state.products.filter(
            (p: Product) => p.id !== productId
          );
        }
      }
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => set(() => initialState),
});
