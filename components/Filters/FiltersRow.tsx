"use client"

import * as React from "react"
import { useFilterStore } from "@/src/store"
import { EventState, EventTypes, LocationTypes } from "@/src/utils/constants"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePickerWithRange } from "../DatePickerWithRange"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function FiltersRow() {
  const setShowPastEvents = useFilterStore(
    (state: any) => state.setShowPastEvents
  )

  const handleTabChange = (type: EventState.UPCOMING | EventState.PAST) => {
    if (type === EventState.PAST) {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }

  const eventTypeFilters: string[] = useFilterStore(
    (state: any) => state.eventTypeFilters
  )
  const setEventTypeFilters = useFilterStore(
    (state: any) => state.setEventTypeFilters
  )
  const locationTypeFilters: string[] = useFilterStore(
    (state: any) => state.locationTypeFilters
  )
  const setLocationTypeFilters = useFilterStore(
    (state: any) => state.setLocationTypeFilters
  )

  const handleEventTypeChange = (eventType: EventTypes) => {
    let modifiedEventTypeFilters = [...eventTypeFilters]

    if (eventTypeFilters.includes(EventTypes.ALL)) {
      modifiedEventTypeFilters = []
    }

    if (eventType === EventTypes.ALL) {
      modifiedEventTypeFilters = [EventTypes.ALL]
    } else if (eventTypeFilters.includes(eventType)) {
      modifiedEventTypeFilters = modifiedEventTypeFilters.filter(
        (e) => e !== eventType
      )
    } else {
      modifiedEventTypeFilters.push(eventType)
    }

    setEventTypeFilters(modifiedEventTypeFilters)
  }

  const handleLocationTypeChange = (locationType: LocationTypes) => {
    let modifiedLocationTypeFilters = [...locationTypeFilters]

    if (locationTypeFilters.includes(LocationTypes.ALL)) {
      modifiedLocationTypeFilters = []
    }

    if (locationType === LocationTypes.ALL) {
      modifiedLocationTypeFilters = [LocationTypes.ALL]
    } else if (locationTypeFilters.includes(locationType)) {
      modifiedLocationTypeFilters = modifiedLocationTypeFilters.filter(
        (e) => e !== locationType
      )
    } else {
      modifiedLocationTypeFilters.push(locationType)
    }

    setLocationTypeFilters(modifiedLocationTypeFilters)
  }

  return (
    <>
      <div className="-mt-4 mb-4 flex sm:hidden">
        <a
          href="https://cerebralvalley.ai/sheet"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Back to Google Sheet
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-up-right ml-1 inline opacity-40"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      <div className="mb-4 flex flex-row gap-2 overflow-x-auto md:hidden">
        <DatePickerWithRange />

        <DropdownMenu>
          <DropdownMenuTrigger className="min-w-fit max-w-fit" asChild>
            <Button variant="outline">
              Location
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={locationTypeFilters.includes(LocationTypes.ALL)}
              onCheckedChange={() =>
                handleLocationTypeChange(LocationTypes.ALL)
              }
            >
              All Locations
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={locationTypeFilters.includes(LocationTypes.SF)}
              onCheckedChange={() => handleLocationTypeChange(LocationTypes.SF)}
            >
              San Francisco
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={locationTypeFilters.includes(LocationTypes.NYC)}
              onCheckedChange={() =>
                handleLocationTypeChange(LocationTypes.NYC)
              }
            >
              New York City
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={locationTypeFilters.includes(LocationTypes.LONDON)}
              onCheckedChange={() =>
                handleLocationTypeChange(LocationTypes.LONDON)
              }
            >
              London
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={locationTypeFilters.includes(LocationTypes.REMOTE)}
              onCheckedChange={() =>
                handleLocationTypeChange(LocationTypes.REMOTE)
              }
            >
              Remote
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="min-w-fit max-w-fit" asChild>
            <Button variant="outline">
              Event Type
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={eventTypeFilters.includes(EventTypes.ALL)}
              onCheckedChange={() => handleEventTypeChange(EventTypes.ALL)}
            >
              All Events
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={eventTypeFilters.includes(EventTypes.HACKATHON)}
              onCheckedChange={() =>
                handleEventTypeChange(EventTypes.HACKATHON)
              }
            >
              Hackathons
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={eventTypeFilters.includes(EventTypes.CO_WORKING)}
              onCheckedChange={() =>
                handleEventTypeChange(EventTypes.CO_WORKING)
              }
            >
              Co-Working
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select onValueChange={handleTabChange}>
          <SelectTrigger className="min-w-fit max-w-fit">
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
    </>
  )
}
