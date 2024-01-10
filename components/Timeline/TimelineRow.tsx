import DateComponent from "./DateComponent"
import UpcomingEventCard from "./UpcomingEventCard"

export default function TimelineRow({
  event,
  showDateComponent,
}: {
  event: EventType
  showDateComponent: boolean
}) {
  return (
    <div className="flex-row border-l-2 border-dashed border-[#e8e8ea] pb-10 dark:border-[#28272c]">
      {showDateComponent && (
        <DateComponent
          startDate={event.startDateTime}
          endDate={event.endDateTime}
        />
      )}
      <UpcomingEventCard event={event} />
    </div>
  )
}
