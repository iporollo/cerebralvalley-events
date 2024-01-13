import React from "react"

import { FeaturedEventsCarousel } from "./FeaturedEventsCarousel"

interface FeaturedEventsTimelineContainerProps {
  events: FeaturedEventType[]
}

const FeaturedEvents: React.FC<FeaturedEventsTimelineContainerProps> = ({
  events,
}) => {
  // If there are no upcoming events, don't render the component
  if (events.length === 0) {
    return null
  }

  return (
    <div className="mt-6 flex flex-col items-start justify-between overflow-hidden pb-4">
      <div className="pb-4 text-2xl">Featured Events</div>
      <FeaturedEventsCarousel events={events} />
    </div>
  )
}

export default FeaturedEvents
