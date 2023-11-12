import React, { useEffect, useState } from "react"
import AirtableService from "src/services/airtable"
import { AirtableTableFeaturedEventColumns } from "src/utils/constants"

import { FeaturedEventsCarousel } from "./FeaturedEventsCarousel"

export default function FeaturedEvents() {
  const [isLoading, setIsLoading] = useState(true)
  const [featuredEvents, setFeaturedEvents] = useState<FeaturedEventType[]>([])
  const [clientFilteredEvents, setClientFilteredEvents] = useState<
    FeaturedEventType[]
  >([])

  const fetchData = async () => {
    setIsLoading(true)

    const response = await AirtableService.fetchFeaturedEvents()

    const mappedEvents = eventObjMapper(response)

    setFeaturedEvents(mappedEvents)
    setClientFilteredEvents(clientFilter(mappedEvents))

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const eventObjMapper = (events: any[]) => {
    const mappedEvents: FeaturedEventType[] = []

    events.forEach(async (event) => {
      const imageUriArray = event.get(AirtableTableFeaturedEventColumns.IMAGE)
      const imageUri =
        imageUriArray && imageUriArray.length > 0 ? imageUriArray[0].url : null

      const mappedEventObj: FeaturedEventType = {
        id: event.getId(),
        event: event.get(AirtableTableFeaturedEventColumns.EVENT),
        startDate: event.get(AirtableTableFeaturedEventColumns.START),
        endDate: event.get(AirtableTableFeaturedEventColumns.END),
        location: event.get(AirtableTableFeaturedEventColumns.LOCATION),
        link: event.get(AirtableTableFeaturedEventColumns.LINK),
        tags: event.get(AirtableTableFeaturedEventColumns.TAGS) || [],
        paid: event.get(AirtableTableFeaturedEventColumns.PAID),
        cvEvent: event.get(AirtableTableFeaturedEventColumns.CVEVENT),
        imageUri: imageUri,
      }
      mappedEvents.push(mappedEventObj)
    })
    console.log(mappedEvents)
    return mappedEvents
  }

  const clientFilter = (events: FeaturedEventType[]) => {
    const currentDate = new Date()
    const filteredEvents = events.filter((event) => {
      const eventEndDate = new Date(event.endDate)
      if (event.cvEvent) {
        return eventEndDate > currentDate && event.imageUri !== null
      } else {
        return (
          eventEndDate > currentDate && event.imageUri !== null && event.paid
        )
      }
    })
    return filteredEvents
  }

  // If there are no upcoming events, don't render the component
  if (clientFilteredEvents.length === 0) {
    return null
  }

  return (
    <div className="mt-6 flex flex-col items-start justify-between overflow-hidden pb-4">
      <div className="pb-4 text-2xl">Featured Events</div>
      <FeaturedEventsCarousel events={clientFilteredEvents} />
    </div>
  )
}
