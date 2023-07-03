import type { EventType } from "@/types/event"

import DateComponent from "./DateComponent"
import UpcomingEventCard from "./UpcomingEventCard"

export default function TimelineRow({ event }: { event: EventType }) {
  return (
    <div className="flex-row border-l-2 border-dashed border-[#e8e8ea] pb-10 dark:border-[#28272c]">
      <DateComponent startDate={event.startDate} endDate={event.endDate} />
      <UpcomingEventCard event={event} />
    </div>
  )
}
