import React from "react"

import { FeaturedEventsCarousel } from "./FeaturedEventsCarousel"

export default function FeaturedEvents() {
  // Example data for the cards
  let featuredEvents: EventType[] = [
    {
      id: "1",
      event: "TEDAI Day 2",
      startDate: "2023-10-18T10:00:00-08:00",
      endDate: "2023-10-18T18:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://partiful.com/e/ixK2N9pdhslh7XE1lOrA",
      tags: [],
      usersInterested: [],
      imageUri: "/tedai2.png",
    },
  ]

  // Get current date
  const currentDate = new Date()

  // Filter out events whose end date is less than the current date
  const filteredEvents = featuredEvents.filter((event) => {
    const eventEndDate = new Date(event.endDate)
    return eventEndDate > currentDate
  })

  // If there are no upcoming events, don't render the component
  if (filteredEvents.length === 0) {
    return null
  }

  return (
    <div className="mt-6 flex flex-col items-start justify-between overflow-hidden pb-4">
      <div className="pb-4 text-2xl">Featured Events</div>
      <FeaturedEventsCarousel events={filteredEvents} />
    </div>
  )
}
