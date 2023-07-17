"use client"

import { useEffect } from "react"
import useStore from "@/src/store"
import { EventTypes, LocationTypes } from "@/src/utils/constants"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FiltersCard() {
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
    <Card className="my-4 border-[#e3e3e3] bg-transparent dark:border-[#313035]">
      <CardHeader className="pb-4">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="my-2">Event Type</CardDescription>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={EventTypes.ALL}
            checked={eventTypeFilters.includes(EventTypes.ALL)}
            onCheckedChange={() => handleEventTypeChange(EventTypes.ALL)}
          />
          <label
            htmlFor={EventTypes.ALL}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All Events
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox
            id={EventTypes.HACKATHON}
            checked={eventTypeFilters.includes(EventTypes.HACKATHON)}
            onCheckedChange={() => handleEventTypeChange(EventTypes.HACKATHON)}
          />
          <label
            htmlFor={EventTypes.HACKATHON}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Hackathons
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox
            id={EventTypes.CO_WORKING}
            checked={eventTypeFilters.includes(EventTypes.CO_WORKING)}
            onCheckedChange={() => handleEventTypeChange(EventTypes.CO_WORKING)}
          />
          <label
            htmlFor={EventTypes.CO_WORKING}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Co-Working
          </label>
        </div>
        <CardDescription className="mb-2 mt-6">Location</CardDescription>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={LocationTypes.ALL}
            checked={locationTypeFilters.includes(LocationTypes.ALL)}
            onCheckedChange={() => handleLocationTypeChange(LocationTypes.ALL)}
          />
          <label
            htmlFor={LocationTypes.ALL}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All Locations
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox
            id={LocationTypes.SF}
            checked={locationTypeFilters.includes(LocationTypes.SF)}
            onCheckedChange={() => handleLocationTypeChange(LocationTypes.SF)}
          />
          <label
            htmlFor={LocationTypes.SF}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            San Francisco
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox
            id={LocationTypes.NYC}
            checked={locationTypeFilters.includes(LocationTypes.NYC)}
            onCheckedChange={() => handleLocationTypeChange(LocationTypes.NYC)}
          />
          <label
            htmlFor={LocationTypes.NYC}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            New York City
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox
            id={LocationTypes.REMOTE}
            checked={locationTypeFilters.includes(LocationTypes.REMOTE)}
            onCheckedChange={() =>
              handleLocationTypeChange(LocationTypes.REMOTE)
            }
          />
          <label
            htmlFor={LocationTypes.REMOTE}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remote
          </label>
        </div>
      </CardContent>
    </Card>
  )
}