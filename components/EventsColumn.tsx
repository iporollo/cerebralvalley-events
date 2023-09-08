"use client"

import React from "react"
import { useFilterStore } from "@/src/store"

import FiltersRow from "@/components/Filters/FiltersRow"
import SubmitEvent from "@/components/SubmitEvent"
import TimelineContainer from "@/components/Timeline/TimelineContainer"

export default function EventsColumn() {
  const showPastEvents = useFilterStore((state: any) => state.showPastEvents)
  return (
    <div className="mx-6 md:w-full">
      <FiltersRow />
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-between pb-4 sm:flex-row">
          <div className="mb-2 text-2xl md:mb-0">
            {showPastEvents ? "Past Events" : "Upcoming Events"}
          </div>
          <div className="md:hidden">
            <SubmitEvent />
          </div>
        </div>
        <TimelineContainer />
      </div>
    </div>
  )
}
