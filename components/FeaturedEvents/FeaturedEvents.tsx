import React from "react"

import { FeaturedEventsCarousel } from "./FeaturedEventsCarousel"

export default function FeaturedEvents() {
  // Example data for the cards
  let featuredEvents: EventType[] = [
    {
      id: "1",
      event: "AI Builders x Google Workshop",
      startDate: "2023-10-12T16:00:00-08:00",
      endDate: "2023-10-12T19:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://partiful.com/e/abAj61tgTOvQScjl5IyP?",
      tags: [],
      usersInterested: [],
      imageUri: "/google.webp",
    },
    {
      id: "2",
      event: `Women in AI Co-Working Day with General Catalyst`,
      startDate: "2023-10-13T09:00:00-08:00",
      endDate: "2023-10-13T18:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://partiful.com/e/dnClxUxp45mwgxxUnTcR",
      tags: [],
      usersInterested: [],
      imageUri: "/womeninai.webp",
    },
    {
      id: "3",
      event: "Multimodal AI Hackathon (23 Labs)",
      startDate: "2023-10-14T00:00:00-08:00",
      endDate: "2023-10-15T00:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://cerebralvalley.ai/multimodal",
      tags: [],
      usersInterested: [],
      imageUri: "/multimodal.webp",
    },
    {
      id: "4",
      event: `TEDAI For Good Hackathon`,
      startDate: "2023-10-14T00:00:00-08:00",
      endDate: "2023-10-15T00:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://www.ai-event.ted.com/hackathon",
      tags: [],
      usersInterested: [],
      imageUri: "/tedai.png",
    },
  ]

  // Get current date
  const currentDate = new Date()

  // Filter out events whose end date is less than the current date
  const filteredEvents = featuredEvents.filter((event) => {
    const eventEndDate = new Date(event.endDate)
    return eventEndDate > currentDate
  })

  return (
    <div className="mt-6 flex flex-col items-start justify-between overflow-hidden pb-4">
      <div className="pb-4 text-2xl">Featured Events</div>
      <FeaturedEventsCarousel events={filteredEvents} />
    </div>
  )
}
