import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FiltersCard() {
  return (
    <Card className="my-4 border-[#e3e3e3] bg-transparent dark:border-[#313035]">
      <CardHeader className="pb-4">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="my-2">Event Type</CardDescription>
        <RadioGroup defaultValue="allEvents">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="allEvents" id="allEvents" />
            <Label htmlFor="allEvents">All Events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hackathons" id="hackathons" />
            <Label htmlFor="hackathons">Hackathons</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="co-working" id="co-working" />
            <Label htmlFor="co-working">Co-Working</Label>
          </div>
        </RadioGroup>
        <CardDescription className="mb-2 mt-6">Location</CardDescription>
        <RadioGroup defaultValue="allLocations">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="allLocations" id="allLocations" />
            <Label htmlFor="allLocations">All Locations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SF" id="SF" />
            <Label htmlFor="SF">San Francisco</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NYC" id="NYC" />
            <Label htmlFor="NYC">New York City</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
