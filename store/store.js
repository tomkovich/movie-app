import create from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      items: [],

      setItems: ({ data }) => set({ items: data }),
    }),
    {
      name: "storage",
    }
  )
);
