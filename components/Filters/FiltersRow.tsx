"use client"

import * as React from "react"
import useStore from "@/src/store"
import { EventState, EventTypes, LocationTypes } from "@/src/utils/constants"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePickerWithRange } from "../DatePickerWithRange"

export default function FiltersRow() {
  const setShowPastEvents = useStore((state: any) => state.setShowPastEvents)

  const handleTabChange = (type: EventState.UPCOMING | EventState.PAST) => {
    if (type === EventState.PAST) {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }

  const eventTypeFilters: string[] = useStore(
    (state: any) => state.eventTypeFilters
  )
  const setEventTypeFilters = useStore(
    (state: any) => state.setEventTypeFilters
  )
  const locationTypeFilters: string[] = useStore(
    (state: any) => state.locationTypeFilters
  )
  const setLocationTypeFilters = useStore(
    (state: any) => state.setLocationTypeFilters
  )

  const handleEventTypeChange = (
    eventType: EventTypes.ALL | EventTypes.HACKATHON | EventTypes.CO_WORKING
  ) => {
    if (eventTypeFilters.includes(eventType)) {
      setEventTypeFilters(eventTypeFilters.filter((e) => e !== eventType))
    } else {
      setEventTypeFilters([...eventTypeFilters, eventType])
    }
  }

  const handleLocationTypeChange = (locationType: LocationTypes) => {
    if (locationTypeFilters.includes(locationType)) {
      setLocationTypeFilters(
        locationTypeFilters.filter((e) => e !== locationType)
      )
    } else {
      setLocationTypeFilters([...locationTypeFilters, locationType])
    }
  }

  return (
    <div className="mb-4 flex flex-row gap-2 overflow-x-auto md:hidden">
      <DatePickerWithRange />

      <Select onValueChange={handleLocationTypeChange}>
        <SelectTrigger className="min-w-fit">
          <SelectValue
            defaultValue={LocationTypes.ALL}
            placeholder="All Locations"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={LocationTypes.ALL}>All Events</SelectItem>
          <SelectItem value={LocationTypes.SF}>San Francisco</SelectItem>
          <SelectItem value={LocationTypes.NYC}>New York City</SelectItem>
          <SelectItem value={LocationTypes.REMOTE}>Remote</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleEventTypeChange}>
        <SelectTrigger className="min-w-fit">
          <SelectValue defaultValue={EventTypes.ALL} placeholder="All Events" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EventTypes.ALL}>All Events</SelectItem>
          <SelectItem value={EventTypes.HACKATHON}>Hackathon</SelectItem>
          <SelectItem value={EventTypes.CO_WORKING}>Coworking</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleTabChange}>
        <SelectTrigger className="min-w-fit">
          <SelectValue
            defaultValue={EventState.UPCOMING}
            placeholder="Upcoming"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EventState.UPCOMING}>Upcoming</SelectItem>
          <SelectItem value={EventState.PAST}>Past</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
