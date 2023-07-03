"use client"

import React, { useEffect, useState } from "react"
import EventService from "src/services/events"
import { AirtableTableEventColumns } from "src/utils/constants"

import type { EventType } from "@/types/event"

import TimelineRow from "./TimelineRow"

const TimelineContainer = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [isLoading, setIsLoading] = useState(true) // Loading state
  // const [filteredData, setFilteredData] = useState([]);

  const eventObjMapper = (events: any[]) => {
    const mappedEvents: EventType[] = []

    events.forEach(async (event) => {
      const mappedEventObj: EventType = {
        id: event.getId(),
        event: event.get(AirtableTableEventColumns.EVENT),
        startDate: event.get(AirtableTableEventColumns.START),
        endDate: event.get(AirtableTableEventColumns.END),
        location: event.get(AirtableTableEventColumns.LOCATION),
        link: event.get(AirtableTableEventColumns.LINK),
        tags: event.get(AirtableTableEventColumns.TAGS) || [],
      }
      mappedEvents.push(mappedEventObj)
    })
    return mappedEvents
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await EventService.fetchUpcomingEvents()
    setEvents(eventObjMapper(response))
    // setFilteredData(data) // Set initial filtered data same as the initial data
    setIsLoading(false) // Data has been fetched, set loading to false
  }

  return (
    <div className="mx-8">
      {isLoading ? (
        <div>Loading...</div> // Loading state
      ) : events.length === 0 ? (
        <div>No events found</div> // Empty state
      ) : (
        events.map((event) => <TimelineRow key={event.id} event={event} />)
      )}
    </div>
  )
}

export default TimelineContainer
