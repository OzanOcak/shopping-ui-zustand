import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "@/store/user-slice";
import { Store } from "@/types/store";
import { createCartSlice } from "./cart-slice";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get, store) => ({
          ...createUserSlice(set as any, get, store as any),
          ...createCartSlice(set as any, get, store as any),
        }))
      ),
      {
        name: "local-storage",
      }
    )
  )
);
