import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useViewerStore = create(
  persist(
    (set) => ({
      // Stores all page viewers
      pageViewers: [],
      setPageViewers: (users: any) =>
        set((state: any) => ({ pageViewers: users })),
    }),
    {
      name: "viewers_store",
    }
  )
)
