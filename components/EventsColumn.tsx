"use client"

import React from "react"
import { useFilterStore } from "@/src/store"

import FeaturedEvents from "@/components/FeaturedEvents/FeaturedEvents"
import FiltersRow from "@/components/Filters/FiltersRow"
import TimelineContainer from "@/components/Timeline/TimelineContainer"

import SubmitEventDialog from "./SubmitEventDialog"

export default function EventsColumn() {
  const showPastEvents = useFilterStore((state: any) => state.showPastEvents)
  return (
    <div className="mx-6">
      <FiltersRow />
      <FeaturedEvents />

      <div className="flex flex-col">
        <div className="flex flex-col items-start justify-between pb-4 sm:flex-row">
          <div className="mb-2 text-2xl md:mb-0">
            {showPastEvents ? "Past Events" : "Upcoming Events"}
          </div>
          <div className="md:hidden">
            <SubmitEventDialog />
          </div>
        </div>
        <TimelineContainer />
      </div>
    </div>
  )
}
