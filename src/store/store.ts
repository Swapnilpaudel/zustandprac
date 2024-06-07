import { createCartSlice } from "./cartSlice";
import { create } from "zustand";
import { createUserSlice } from "./userSlice";
import { immer } from "zustand/middleware/immer";
import { Store } from "@/types/store";
import { devtools } from "zustand/middleware";

export const useStore = create<Store>()(
  devtools(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createCartSlice(...a),
    }))
  )
);
