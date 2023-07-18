"use client"

import React from "react"
import useStore from "@/src/store"

import FiltersRow from "@/components/Filters/FiltersRow"
import SubmitEvent from "@/components/SubmitEvent"
import TimelineContainer from "@/components/Timeline/TimelineContainer"

export default function EventsColumn() {
  const showPastEvents = useStore((state: any) => state.showPastEvents)
  return (
    <div className="mx-6">
      <FiltersRow />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-bold">
            {showPastEvents ? "Past Events" : "Upcoming Events"}
          </div>
          <SubmitEvent />
        </div>
        <TimelineContainer />
      </div>
    </div>
  )
}
