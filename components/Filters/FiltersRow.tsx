"use client"

import * as React from "react"
import useStore from "@/src/store"
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
            onCheckedChange={() => handleLocationTypeChange(LocationTypes.ALL)}
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
            onCheckedChange={() => handleLocationTypeChange(LocationTypes.NYC)}
          >
            New York City
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
            onCheckedChange={() => handleEventTypeChange(EventTypes.HACKATHON)}
          >
            Hackathons
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={eventTypeFilters.includes(EventTypes.CO_WORKING)}
            onCheckedChange={() => handleEventTypeChange(EventTypes.CO_WORKING)}
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
  )
}
