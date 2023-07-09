import * as React from "react"

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
  const handleEventTypeChange = (
    eventType: "allEvents" | "hackathon" | "co-working"
  ) => {
    console.log(eventType)
  }

  return (
    <Card className="my-4 border-[#e3e3e3] bg-transparent dark:border-[#313035]">
      <CardHeader className="pb-4">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="my-2">Event Type</CardDescription>
        <div className="flex items-center space-x-2">
          <Checkbox id="allEvents" checked={true} onCheckedChange={() => {}} />
          <label
            htmlFor="allEvents"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All Events
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox id="hackathons" />
          <label
            htmlFor="hackathons"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Hackathons
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox id="co-working" />
          <label
            htmlFor="co-working"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Co-Working
          </label>
        </div>
        <CardDescription className="mb-2 mt-6">Location</CardDescription>
        <div className="flex items-center space-x-2">
          <Checkbox id="allLocations" />
          <label
            htmlFor="allLocations"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All Locations
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox id="sf" />
          <label
            htmlFor="sf"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            San Francisco
          </label>
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Checkbox id="nyc" />
          <label
            htmlFor="nyc"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            New York City
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
