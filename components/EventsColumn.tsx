"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useFilterStore } from "@/src/store"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { BAY_AREA_CITIES, EventTypes, LocationTypes } from "src/utils/constants"

import FeaturedEvents from "@/components/FeaturedEvents/FeaturedEvents"
import FiltersRow from "@/components/Filters/FiltersRow"
import EventsTimelineContainer from "@/components/Timeline/EventsTimelineContainer"

import SubmitEventDialog from "./SubmitEventDialog"

export default function EventsColumn() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<EventType[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<FeaturedEventType[]>([])
  const [clientFilteredGeneralEvents, setClientFilteredGeneralEvents] =
    useState<EventType[]>([])

  const [clientFilteredFeaturedEvents, setClientFilteredFeaturedEvents] =
    useState<FeaturedEventType[]>([])

  const showPastEvents = useFilterStore((state: any) => state.showPastEvents)
  const dateFilter = useFilterStore((state: any) => state.dateFilter)
  const eventTypeFilters = useFilterStore(
    (state: any) => state.eventTypeFilters
  )
  const locationTypeFilters = useFilterStore(
    (state: any) => state.locationTypeFilters
  )

  const clientFilterGeneralEvents = (events: EventType[]) => {
    let filteredEvents = events

    if (!eventTypeFilters.includes(EventTypes.ALL)) {
      filteredEvents = filteredEvents.filter((event) => {
        for (let i = 0; i < eventTypeFilters.length; i++) {
          if (event.type?.includes(eventTypeFilters[i])) {
            return true
          }
        }
        return false
      })
    }

    if (!locationTypeFilters.includes(LocationTypes.ALL)) {
      filteredEvents = filteredEvents.filter((event) => {
        return locationTypeFilters.some((locationTypeFilter: string) => {
          switch (locationTypeFilter) {
            case LocationTypes.BAY_AREA:
              return BAY_AREA_CITIES.includes(event.location)
            case LocationTypes.REMOTE:
              return event.location === "Remote"
            case LocationTypes.NYC:
              return event.location === "New York, NY"
            case LocationTypes.LONDON:
              return event.location === "London, UK"
          }
        })
      })
    }
    return filteredEvents
  }

  const clientFilterFeaturedEvents = (events: FeaturedEventType[]) => {
    const currentDate = new Date()
    const filteredEvents = events.filter((event) => {
      const eventEndDate = new Date(event.endDateTime)
      const featuredStartDate = event.featuredStartDate
        ? new Date(event.featuredStartDate)
        : null
      const featuredEndDate = event.featuredEndDate
        ? new Date(event.featuredEndDate)
        : null

      // Check if event is between featuredStartDate and featuredEndDate
      const isFeatured =
        featuredStartDate && featuredEndDate
          ? currentDate >= featuredStartDate && currentDate <= featuredEndDate
          : true

      if (event.cvEvent) {
        return (
          isFeatured && eventEndDate > currentDate && event.imageLink !== null
        )
      } else {
        return (
          isFeatured &&
          eventEndDate > currentDate &&
          event.imageLink !== null &&
          event.paid
        )
      }
    })

    const sortedEvents = sortFeaturedEvents(filteredEvents)

    return sortedEvents
  }

  const sortFeaturedEvents = (events: FeaturedEventType[]) => {
    return events.sort((a, b) => {
      // Prioritize CV events
      if (b.cvEvent && !a.cvEvent) return 1
      if (a.cvEvent && !b.cvEvent) return -1

      // If neither or both are CV events, sort by startDate
      const aStartDate = new Date(a.startDateTime)
      const bStartDate = new Date(b.startDateTime)

      return aStartDate > bStartDate ? 1 : -1
    })
  }

  const generalEventObjectMapper = (events: any[]) => {
    const mappedEvents: EventType[] = []

    events.forEach(async (event) => {
      const mappedEventObj: EventType = {
        id: event.id,
        name: event.name,
        startDateTime: new Date(event.startDateTime).toISOString(),
        endDateTime: new Date(event.endDateTime).toISOString(),
        location: event.location,
        url: event.url,
        type: event.type,
      }
      mappedEvents.push(mappedEventObj)
    })
    return mappedEvents
  }

  const featuredEventObjMapper = (events: any[]) => {
    const mappedEvents: FeaturedEventType[] = []

    events.forEach(async (event) => {
      const mappedEventObj: FeaturedEventType = {
        id: event.id,
        name: event.name,
        startDateTime: new Date(event.startDateTime).toISOString(),
        endDateTime: new Date(event.endDateTime).toISOString(),
        featuredStartDate: event.featuredStartTime,
        featuredEndDate: event.featuredEndTime,
        location: event.location,
        url: event.url,
        type: event.type,
        paid: event.paid,
        cvEvent: event.CVEvent,
        imageLink: event.imageLink,
      }
      mappedEvents.push(mappedEventObj)
    })

    return mappedEvents
  }

  const fetchInitialData = async () => {
    setIsLoading(true)

    const params = new URLSearchParams({
      featured: "true",
      approved: "true",
      show: "upcoming",
    })

    const response = await fetch(`/api/events/fetch?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch events")
      setIsLoading(false)
      return
    }

    const data = await response.json()

    const generalEvents = data.approvedEvents
    const featuredEvents = data.featuredEvents

    const mappedGeneralEvents = generalEventObjectMapper(generalEvents)
    const mappedFeaturedEvents = featuredEventObjMapper(featuredEvents)

    setEvents(mappedGeneralEvents)
    setFeaturedEvents(mappedFeaturedEvents)

    setClientFilteredGeneralEvents(
      clientFilterGeneralEvents(mappedGeneralEvents)
    )
    setClientFilteredFeaturedEvents(
      clientFilterFeaturedEvents(mappedFeaturedEvents)
    )

    setIsLoading(false)
  }

  const fetchWithFilters = async (dateRangeFilter?: DateRange) => {
    setIsLoading(true)

    let from, to

    if (
      dateRangeFilter &&
      "from" in dateRangeFilter &&
      "to" in dateRangeFilter
    ) {
      from = dateRangeFilter.from
      to = dateRangeFilter.to
    }

    const params = new URLSearchParams({
      featured: "true",
      approved: "true",
    })

    if (from) {
      const fromDate = Math.floor(new Date(from).getTime() / 1000).toString()
      params.append("startDate", fromDate)
    }

    if (to) {
      to.setHours(23, 59, 59, 999)
      const toDate = Math.floor(to.getTime() / 1000).toString()
      params.append("endDate", toDate)
    } else if (from && !to) {
      const toDate = new Date(from!)
      toDate.setDate(toDate.getDate() + 1)
      const toDateUnix = Math.floor(toDate.getTime() / 1000).toString()
      params.append("endDate", toDateUnix)
    }

    if (!from && !to) {
      const show = showPastEvents ? "past" : "upcoming"
      params.append("show", show)
    }

    const response = await fetch(`/api/events/fetch?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch events")
      setIsLoading(false)
      return
    }

    const data = await response.json()

    const generalEvents = data.approvedEvents

    const mappedGeneralEvents = generalEventObjectMapper(generalEvents)

    setEvents(mappedGeneralEvents)

    setClientFilteredGeneralEvents(
      clientFilterGeneralEvents(mappedGeneralEvents)
    )

    setIsLoading(false)
  }

  useEffect(() => {
    setClientFilteredGeneralEvents(clientFilterGeneralEvents(events))
  }, [events, eventTypeFilters, locationTypeFilters])

  useEffect(() => {
    fetchWithFilters(dateFilter)
  }, [dateFilter, showPastEvents])

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <div className="mx-6 sm:w-[70%]">
      <FiltersRow />
      <FeaturedEvents events={clientFilteredFeaturedEvents} />

      <div className="flex flex-col">
        <div className="flex flex-col items-start justify-between pb-4 sm:flex-row">
          <div className="mb-2 text-2xl md:mb-0">
            {showPastEvents ? "Past Events" : "Upcoming Events"}
          </div>
          <div className="md:hidden">
            <SubmitEventDialog />
          </div>
        </div>
        <EventsTimelineContainer
          events={clientFilteredGeneralEvents}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
