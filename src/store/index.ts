// Zustand store logic
import { create } from "zustand"

const useStore = create((set) => ({
  filters: [],
  filtersInput: (input: string[]) => set((state: any) => ({ filters: input })),
  showPastEvents: false,
  setShowPastEvents: (show: boolean) =>
    set((state: any) => ({ showPastEvents: show })),
  // isSearchDrawerOpen: false,
  // setIsSearchDrawerOpen: (isOpen: boolean) =>
  //   set((state: any) => ({ isSearchDrawerOpen: isOpen })),
  // searchQuery: '',
  // searchInput: (input: string) => set((state: any) => ({ searchQuery: input })),
  // loginModalOpen: false,
  // loginModalSetOpen: (isOpen: boolean) =>
  //   set((state: any) => ({ loginModalOpen: isOpen })),
}))

export default useStore
