// Zustand store logic

import { DateRange } from "react-day-picker"
import { create } from "zustand"

import { EventTypes, LocationTypes } from "../utils/constants"

export const useFilterStore = create((set) => ({
  eventTypeFilters: [EventTypes.ALL],
  setEventTypeFilters: (input: string[]) =>
    set((state: any) => ({ eventTypeFilters: input })),
  locationTypeFilters: [LocationTypes.ALL],
  setLocationTypeFilters: (input: string[]) =>
    set((state: any) => ({ locationTypeFilters: input })),
  dateFilter: undefined,
  setDateFilter: (input: DateRange | undefined) =>
    set((state: any) => ({ dateFilter: input })),
  showPastEvents: false,
  setShowPastEvents: (show: boolean) =>
    set((state: any) => ({ showPastEvents: show })),
}))
