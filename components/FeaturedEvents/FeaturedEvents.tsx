import React from "react"

import { FeaturedEventsCarousel } from "./FeaturedEventsCarousel"

export default function FeaturedEvents() {
  // Example data for the cards
  let featuredEvents: EventType[] = [
    {
      id: "1",
      event: "AI Builders Coworking at Lightspeed Venture Partners",
      startDate: "2023-10-05T00:00:00-08:00",
      endDate: "2023-10-05T00:00:00-08:00",
      location: "San Francisco, CA",
      link: "https://partiful.com/e/kmdZApFNjep6fpOEaAH0",
      tags: [],
      usersInterested: [],
      imageUri: "/lightspeed.webp",
    },
    {
      id: "2",
      event: `Women in AI Co-Working Day with General Catalyst`,
      startDate: "2023-10-13T00:00:00-08:00",
      endDate: "2023-10-13T00:00:00-08:00",
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

  return (
    <div className="mt-6 flex flex-col items-start justify-between overflow-hidden pb-4">
      <div className="pb-4 text-2xl">Featured Events</div>
      <FeaturedEventsCarousel events={featuredEvents} />
    </div>
  )
}
