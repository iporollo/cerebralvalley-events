import * as React from "react"

import type { EventType } from "@/types/event"
import { Badge } from "@/components/ui/badge"

export default function UpcomingEventCard({ event }: { event: EventType }) {
  return (
    <div className="w-400 grow">
      <div className="ml-8 flex grow flex-col rounded-lg border-[1px] border-x-[#e3e3e3] border-b-[#d3d3d5] border-t-[#e7e7e9] bg-white px-5 py-3.5 text-[#717078] duration-200 hover:border-x-[#bbbbbd] hover:border-b-[#b2b3b5] hover:border-t-[#c3c3c5] hover:shadow-[0_0_8px_rgba(178,179,181,0.20)] dark:border-x-[#313035] dark:border-b-[#333237] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b] dark:hover:border-[#a1a1a3] dark:hover:bg-[#1b1a1f] dark:hover:text-[#a1a1a3] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]">
        <a href={event.link} target="_blank" rel="noreferrer">
          <p>
            {new Date(event.startDate).toLocaleString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <h3 className="my-1 text-lg font-medium text-gray-900 dark:font-normal dark:text-white">
            {event.event}
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
          {event.tags && event.tags.length > 0 && (
            <div className="mb-1 mt-2">
              <Badge>{event.tags}</Badge>
            </div>
          )}
        </a>
      </div>
    </div>
  )
}
