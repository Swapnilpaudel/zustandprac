import { createCartSlice } from "./cartSlice";
import { create } from "zustand";
import { createUserSlice } from "./userSlice";
import { immer } from "zustand/middleware/immer";
import { Store } from "@/types/store";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createCartSlice(...a),
      }))
    )
  )
);
