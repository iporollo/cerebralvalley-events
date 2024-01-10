import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import AirtableService from "@/src/services/airtable"
import { AirtableTableUserColumns } from "@/src/utils/constants"
import { mapCalEvent } from "@/src/utils/mappers/calEventMapper"
import { buildShareUrl } from "@/src/utils/saveToCalendar"
import { CalendarPlus, Heart } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import posthog from "posthog-js"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const AddToCalendar = ({ event }: { event: EventType }) => {
  return (
    <Button
      variant={"outline"}
      className="flex h-fit border-[#e3e3e3] bg-gray-200 text-xs dark:border-[#313035] dark:bg-black"
      onClick={() => {
        const mappedCalEvent: AddToCalEvent = mapCalEvent(event)
        const url = buildShareUrl(mappedCalEvent, "GOOGLE")
        window.open(url, "_blank")
      }}
    >
      <CalendarPlus className="h-4 w-4" />
    </Button>
  )
  // TODO: For future enhancement
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button
  //         variant={"outline"}
  //         className="flex h-fit border-[#e3e3e3] bg-gray-200 text-xs dark:border-[#313035] dark:bg-black"
  //       >
  //         <CalendarPlus className="h-4 w-4" />
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent align="end" forceMount>
  //       <DropdownMenuItem
  //         style={{ cursor: "pointer" }}
  // onClick={() => {
  //   const mappedCalEvent: AddToCalEvent = mapCalEvent(event)
  //   const url = buildShareUrl(mappedCalEvent, "GOOGLE")
  //   window.open(url, "_blank")
  // }}
  //       >
  //         Google Calendar
  //       </DropdownMenuItem>
  //       <DropdownMenuItem
  //         style={{ cursor: "pointer" }}
  //         onClick={() => {
  //           const mappedCalEvent: AddToCalEvent = mapCalEvent(event)
  //           const url = buildShareUrl(mappedCalEvent, "OUTLOOK")
  //           window.open(url, "_blank")
  //         }}
  //       >
  //         Outlook Calendar
  //       </DropdownMenuItem>
  //       <DropdownMenuItem
  //         style={{ cursor: "pointer" }}
  //         onClick={() => {
  //           const mappedCalEvent: AddToCalEvent = mapCalEvent(event)
  //           const url = buildShareUrl(mappedCalEvent, "ICAL")
  //           window.open(url, "_blank")
  //         }}
  //       >
  //         Apple Calendar
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // )
}

const EventActions = ({ event }: { event: EventType }) => {
  return (
    <div className="flex">
      <AddToCalendar event={event} />
    </div>
  )
}

export default function UpcomingEventCard({ event }: { event: EventType }) {
  const formatEventTypeBadge = (type: string) => {
    switch (type) {
      case "COWORKING":
        return "Co-Working"
      case "HACKATHON":
        return "Hackathon"
    }
  }

  return (
    <div className="w-400 grow">
      <div className="ml-8 flex grow flex-col rounded-lg border-[1px] border-x-[#e3e3e3] border-b-[#d3d3d5] border-t-[#e7e7e9] bg-white px-5 py-3.5 text-[#717078] duration-200 dark:border-x-[#313035] dark:border-b-[#333237] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b] ">
        <p>
          {new Date(event.startDateTime).toLocaleString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            posthog.capture("event-click")
          }}
        >
          <h3 className="my-1 text-lg font-medium text-gray-900 hover:underline dark:font-normal dark:text-white">
            {event.name}
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
          </h3>
        </a>
        <div className="flex items-center justify-between">
          <p className="text-base font-normal text-[#6f737c]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="17.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-map-pin mb-1 mr-2.5 inline opacity-80"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.location}
          </p>
          {!event.type && <EventActions event={event} />}
        </div>
        {event.type && (
          <div className="flex items-center justify-between">
            <div className="mb-1 mt-2">
              <Badge>{formatEventTypeBadge(event.type)}</Badge>
            </div>
            <EventActions event={event} />
          </div>
        )}
      </div>
    </div>
  )
}
