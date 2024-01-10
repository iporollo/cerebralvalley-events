"use client"

import { getDate, getMonth } from "date-fns"

import { Skeleton } from "@/components/ui/skeleton"

import TimelineRow from "./TimelineRow"

interface EventsTimelineContainerProps {
  events: EventType[]
  isLoading: boolean
}

const EventsTimelineContainer: React.FC<EventsTimelineContainerProps> = ({
  events,
  isLoading,
}) => {
  let prevStartDateMonthDay: string | undefined

  return (
    <>
      {isLoading ? (
        <div className="w-400 grow">
          <div className="ml-8 flex grow flex-col rounded-lg border-[1px] border-x-[#e3e3e3] border-b-[#d3d3d5] border-t-[#e7e7e9] bg-white px-5 py-3.5 text-[#717078] duration-200 hover:border-x-[#bbbbbd] hover:border-b-[#b2b3b5] hover:border-t-[#c3c3c5] hover:shadow-[0_0_8px_rgba(178,179,181,0.20)] dark:border-x-[#313035] dark:border-b-[#333237] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b] dark:hover:border-[#a1a1a3] dark:hover:bg-[#1b1a1f] dark:hover:text-[#a1a1a3] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[400px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        events.map((event) => {
          const currentDate = new Date(event.startDateTime)
          const currentDateMonthDay = `${getMonth(currentDate)}-${getDate(
            currentDate
          )}`

          const showDateComponent =
            prevStartDateMonthDay !== currentDateMonthDay
          prevStartDateMonthDay = currentDateMonthDay

          return (
            <TimelineRow
              key={event.id}
              event={event}
              showDateComponent={showDateComponent}
            />
          )
        })
      )}
    </>
  )
}

export default EventsTimelineContainer
