"use client"

import React, { useState } from "react"
import Link from "next/link"
import { BAY_AREA_CITIES } from "@/src/utils/constants"
import { ArrowLeft, Loader } from "lucide-react"
import posthog from "posthog-js"
import DatePicker from "react-datepicker"
import Select from "react-select"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import "react-datepicker/dist/react-datepicker.css"

const bayAreaOptions = BAY_AREA_CITIES.map((city) => ({
  value: city,
  label: city,
}))

const locationSelectOptions = [
  ...bayAreaOptions,
  { value: "New York City, NY", label: "New York City, NY" },
  { value: "London, UK", label: "London, UK" },
  { value: "Remote", label: "Remote" },
  { value: "Other", label: "Other" },
]

const locationSelectCustomStyles = {
  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
    border: "1px solid #333237", // Add default border
    boxShadow: state.isFocused ? "0 0 0 1px white" : "none", // Add boxShadow to mimic focus ring when focused
    fontSize: "14px",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "white" : "#333237",
    "&:hover": {
      color: state.isFocused ? "white" : "#333237",
    },
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "white" : "#333237",
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#333237",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
    fontSize: "14px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "black" : "white",
    backgroundColor: state.isFocused ? "white" : "black",
  }),
  ":active": {
    backgroundColor: "white",
  },
}

export default function SubmitEventPageForm() {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [location, setLocation] = useState<
    { value: string; label: string } | undefined
  >(undefined)
  const [link, setLink] = useState<string | undefined>(undefined)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  const clearState = () => {
    setEmail("")
    setName("")
    setStartDate(null)
    setEndDate(null)
    setLocation(undefined)
    setLink("")
    setFeatured(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    posthog.capture("submit-event-page")
    setLoading(true)

    const formatToPST = (date: Date) => {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
        2,
        "0"
      )} GMT-0800 (Pacific Standard Time)`
    }

    const startDatePST = formatToPST(startDate!)
    const endDatePST = formatToPST(endDate!)

    const response = await fetch("/api/events/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        startDate: startDatePST,
        endDate: endDatePST,
        location: location?.value,
        link,
        featured,
      }),
    })

    if (response.ok) {
      console.log("Form submitted successfully")
      toast("Event submitted successfully.")
      clearState()
      setLoading(false)
    } else {
      console.log("Form submission failed")
      toast("Event submission failed, please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="m-auto w-3/4 py-6 md:w-1/2 xl:w-[35%]">
      <div className="pb-2">
        <Link href="/" className="flex">
          <span className="text-md flex cursor-pointer items-center text-gray-400 hover:text-gray-200">
            <ArrowLeft size={20} />
            Back
          </span>
        </Link>
      </div>
      <div className="pb-6">
        <h1 className="mb-2 text-3xl">Cerebral Valley Event Submission</h1>
        <h2 className="text-md text-gray-400">
          Submit your AI event for placement on our AI events calendar.
        </h2>
      </div>
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
              Start Date/Time (PST) *
            </Label>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => {
                setStartDate(date)
              }}
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
              End Date/Time (PST) *
            </Label>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => {
                setEndDate(date)
              }}
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
            id="location"
            placeholder="Select a location"
            styles={locationSelectCustomStyles}
            classNamePrefix="select"
            isClearable
            isSearchable
            name="color"
            options={locationSelectOptions}
            value={location}
            onChange={(value: any) => setLocation(value)}
            required
            filterOption={(option, input) => {
              if (input) {
                return (
                  option.label.toLowerCase().includes(input.toLowerCase()) ||
                  option.label === "Other"
                )
              }
              return true
            }}
          />
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
            onClick={(e: any) => setFeatured(!featured)}
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
          Select this if you would like to pay to advertise your event as part
          of our featured events. We will reach out to your submitted email.
        </p>
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
      </form>
    </div>
  )
}
