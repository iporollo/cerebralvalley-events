// Zustand store logic

import { DateRange } from "react-day-picker"
import { create } from "zustand"

import { EventTypes, LocationTypes } from "../utils/constants"

const useStore = create((set) => ({
  eventTypeFilters: [
    EventTypes.ALL,
    EventTypes.CO_WORKING,
    EventTypes.HACKATHON,
  ],
  setEventTypeFilters: (input: string[]) =>
    set((state: any) => ({ eventTypeFilters: input })),
  locationTypeFilters: [
    LocationTypes.ALL,
    LocationTypes.SF,
    LocationTypes.NYC,
    LocationTypes.REMOTE,
  ],
  setLocationTypeFilters: (input: string[]) =>
    set((state: any) => ({ locationTypeFilters: input })),
  dateFilter: undefined,
  setDateFilter: (input: DateRange | undefined) =>
    set((state: any) => ({ dateFilter: input })),
  showPastEvents: false,
  setShowPastEvents: (show: boolean) =>
    set((state: any) => ({ showPastEvents: show })),
}))

export default useStore
