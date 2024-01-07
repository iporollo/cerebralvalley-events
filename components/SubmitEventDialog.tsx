import React, { useState } from "react"
import Link from "next/link"
import { setHours, setMinutes } from "date-fns"
import { CheckCircle, Loader, Plus } from "lucide-react"
import DatePicker from "react-datepicker"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "react-datepicker/dist/react-datepicker.css"

export default function SubmitEventDialog() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [showOtherLocation, setShowOtherLocation] = useState(false)
  const [link, setLink] = useState<string | undefined>(undefined)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  const clearState = () => {
    setEmail("")
    setName("")
    setStartDate(null)
    setEndDate(null)
    setLocation(undefined)
    setShowOtherLocation(false)
    setLink("")
    setFeatured(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetch("/api/events/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        startDate,
        endDate,
        location,
        link,
        featured,
      }),
    })

    if (response.ok) {
      console.log("Form submitted successfully")
      clearState()
    } else {
      console.log("Form submission failed")
    }

    setLoading(false)
    setOpen(false)
  }

  return (
    <div className="flex">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={`
        flex h-fit w-full items-center justify-center rounded-md border border-[#e3e3e3] bg-primary px-4
        py-2
        text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-[#313035]
        dark:bg-black dark:text-white dark:hover:text-gray-300
        `}
        >
          <Plus className="mr-2 h-4 w-4" />
          Submit Event
        </DialogTrigger>
        <div style={{ overflow: "scroll" }}>
          <DialogContent className="border-[#333237] bg-[#18171c]">
            <DialogHeader>
              <DialogTitle>Submit Your Event</DialogTitle>
            </DialogHeader>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="mb-2">
                  Your email *
                </Label>
                <Input
                  onChange={(e: any) => setEmail(e.target.value)}
                  className="border-none bg-black text-white ring-1 ring-[#333237] focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  required
                />
                <p className="text-sm text-gray-400">
                  If we need to contact you about the event. Will not be shared.
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="event-name" className="mb-2">
                  Event Name *
                </Label>
                <Input
                  onChange={(e: any) => setName(e.target.value)}
                  className="border-none bg-black text-white ring-1 ring-[#333237] focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1"
                  id="event-name"
                  value={name}
                  placeholder="Enter the event name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="start-date-time" className="mb-2">
                    Start Date/Time (PST)*
                  </Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    id="start-date-time"
                    className="focus-visible:ring-offset-1disabled:cursor-not-allowed flex h-10 w-full rounded-md border border-none border-input bg-black px-3 py-2 text-sm text-white ring-1 ring-[#333237] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:opacity-50"
                    required
                    placeholderText="Select a start date/time"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="end-date-time" className="mb-2">
                    End Date/Time (PST)*
                  </Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    id="end-date-time"
                    className="focus-visible:ring-offset-1disabled:cursor-not-allowed flex h-10 w-full rounded-md border border-none border-input bg-black px-3 py-2 text-sm text-white ring-1 ring-[#333237] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:opacity-50"
                    required
                    placeholderText="Select an end date/time"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="location" className="mb-2">
                  Location *
                </Label>
                <Select
                  value={location}
                  onValueChange={(value: string) => {
                    setLocation(value)
                    value === "other"
                      ? setShowOtherLocation(true)
                      : setShowOtherLocation(false)
                  }}
                >
                  <SelectTrigger
                    className="border-none bg-black text-white ring-1 ring-[#333237] focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1"
                    id="location"
                  >
                    <SelectValue
                      placeholder="Select a location"
                      id="select-value"
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="border-none bg-black text-white ring-1 ring-[#333237]"
                    position="popper"
                  >
                    <SelectItem
                      className="hover:bg-gray-600"
                      value="San Francisco, CA"
                    >
                      San Francisco, CA
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-gray-600"
                      value="New York City, NY"
                    >
                      New York City, NY
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-gray-600"
                      value="London, UK"
                    >
                      London, UK
                    </SelectItem>
                    <SelectItem className="hover:bg-gray-600" value="remote">
                      Remote
                    </SelectItem>
                    <SelectItem className="hover:bg-gray-600" value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                {showOtherLocation && (
                  <Input
                    onChange={(e: any) => setLocation(e.target.value)}
                    className="border-none bg-black text-white ring-1 ring-[#333237] focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1"
                    style={{ marginTop: 8 }}
                    id="other-location"
                    placeholder="Enter the location"
                    required
                  />
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="link-to-event" className="mb-2">
                  Link to Event *
                </Label>
                <Input
                  className="border-none bg-black text-white ring-1 ring-[#333237] focus:ring-1 focus:ring-white focus:ring-offset-1 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1"
                  id="link-to-event"
                  placeholder="Enter the event link"
                  onChange={(e: any) => setLink(e.target.value)}
                  value={link}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-event"
                  onClick={(e: any) => setFeatured(e.target.checked)}
                  checked={featured}
                />
                <label
                  className="text-sm font-medium leading-none text-white"
                  htmlFor="feature-event"
                >
                  Feature this event
                </label>
              </div>
              <p className="text-sm text-gray-400" style={{ marginTop: 8 }}>
                Select this if you would like to pay to advertise your event as
                part of our featured events. We will reach out to your submitted
                email.
              </p>
              <DialogFooter>
                <Button
                  className="w-full border-[1px] border-[#333237] bg-black text-white hover:bg-black hover:opacity-75"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader
                        style={{
                          marginRight: 12,
                          animation: "spin 2s linear infinite",
                        }}
                      />{" "}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
