"use client"

import React, { useEffect, useState } from "react"
import { useFilterStore } from "@/src/store"
import { DateRange } from "react-day-picker"
import AirtableService from "src/services/airtable"
import {
  AirtableTableEventColumns,
  EventTypes,
  LocationTypes,
} from "src/utils/constants"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import TimelineRow from "./TimelineRow"

const TimelineContainer = () => {
  const showPastEvents = useFilterStore((state: any) => state.showPastEvents)
  const dateFilter = useFilterStore((state: any) => state.dateFilter)
  const eventTypeFilters = useFilterStore(
    (state: any) => state.eventTypeFilters
  )
  const locationTypeFilters = useFilterStore(
    (state: any) => state.locationTypeFilters
  )

  const [events, setEvents] = useState<EventType[]>([])
  const [clientFilteredEvents, setClientFilteredEvents] = useState<EventType[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (dateRangeFilter?: DateRange) => {
    setIsLoading(true)

    const response = await AirtableService.fetchEvents(
      showPastEvents,
      dateRangeFilter
    )
    const mappedEvents = eventObjMapper(response)

    setEvents(mappedEvents)
    setClientFilteredEvents(clientFilter(mappedEvents))

    setIsLoading(false)
  }

  useEffect(() => {
    setClientFilteredEvents(clientFilter(events))
  }, [eventTypeFilters, locationTypeFilters])

  useEffect(() => {
    fetchData(dateFilter)
  }, [dateFilter, showPastEvents])

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

  const clientFilter = (events: EventType[]) => {
    let filteredEvents = events
    if (!eventTypeFilters.includes(EventTypes.ALL)) {
      filteredEvents = filteredEvents.filter((event) => {
        for (let i = 0; i < eventTypeFilters.length; i++) {
          if (event.tags?.includes(eventTypeFilters[i])) {
            return true
          }
        }
        return false
      })
    }
    if (!locationTypeFilters.includes(LocationTypes.ALL)) {
      filteredEvents = filteredEvents.filter((event) => {
        for (let i = 0; i < locationTypeFilters.length; i++) {
          if (event.location === locationTypeFilters[i]) {
            return true
          }
        }
        return false
      })
    }
    return filteredEvents
  }

  return (
    <div style={{ width: "100%" }}>
      {isLoading ? (
        <div className="w-400 grow">
          <div className="ml-8 flex grow flex-col rounded-lg border-[1px] border-x-[#e3e3e3] border-b-[#d3d3d5] border-t-[#e7e7e9] bg-white px-5 py-3.5 text-[#717078] duration-200 hover:border-x-[#bbbbbd] hover:border-b-[#b2b3b5] hover:border-t-[#c3c3c5] hover:shadow-[0_0_8px_rgba(178,179,181,0.20)] dark:border-x-[#313035] dark:border-b-[#333237] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b] dark:hover:border-[#a1a1a3] dark:hover:bg-[#1b1a1f] dark:hover:text-[#a1a1a3] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[400px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : clientFilteredEvents.length === 0 ? (
        <div>No events found</div> // Empty state
      ) : (
        clientFilteredEvents.map((event) => (
          <TimelineRow key={event.id} event={event} />
        ))
      )}
    </div>
  )
}

export default TimelineContainer
