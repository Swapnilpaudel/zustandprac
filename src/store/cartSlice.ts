import { Product } from "@/types/products";
import { StateCreator } from "zustand";

export type CartState = {
  products: (Product & { qty: number })[];
  total: number;
};

export type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (
    productID: string
  ) => (Product & { qty: number }) | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

export const initialState: CartState = {
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
  incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.id === productId
      );
      if (foundProduct) foundProduct.qty += 1;
    }),
  decQty: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
        }
      }
    }),

  addProduct: (products) =>
    set((state) => {
      state.products.push({ ...products, qty: 1 });
    }),

  removeProduct: (productID) =>
    set((state) => {
      state.products = state.products.filter(
        (products) => products.id !== productID
      );
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),

  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),

  reset: () => set(() => initialState),
});
