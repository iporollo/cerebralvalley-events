"use client"

import { useFilterStore } from "@/src/store"
import { EventState } from "@/src/utils/constants"
import { format } from "date-fns"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterCard from "@/components/Filters/FiltersCard"
import SubmitEvent from "@/components/SubmitEvent"

export default function FiltersColumn() {
  const setShowPastEvents = useFilterStore(
    (state: any) => state.setShowPastEvents
  )

  const setDateFilter = useFilterStore((state: any) => state.setDateFilter)

  const handleTabChange = (type: EventState.UPCOMING | EventState.PAST) => {
    if (type === EventState.PAST) {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }

  const dateFilter = useFilterStore((state: any) => state.dateFilter)

  const formatSelectedDates = () => {
    const { from, to } = dateFilter
    if (!to) {
      return `${format(from, "MMM d")}`
    } else {
      return `${format(from, "MMM d")} - ${format(to, "MMM d")}`
    }
  }

  return (
    <div className="mx-8 hidden flex-col md:mx-2 md:flex">
      <SubmitEvent variant="outline" />
      <Calendar />
      {dateFilter ? (
        <div className="inline-flex h-10 items-center justify-between rounded-lg border border-[#e3e3e3] bg-transparent p-1 dark:border-[#313035]">
          <p className="mx-4 text-sm">{formatSelectedDates()}</p>
          <Button variant="link" onClick={() => setDateFilter(undefined)}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue={EventState.UPCOMING}>
          <TabsList className="grid w-full grid-cols-2 border-[#e3e3e3] bg-gray-200 dark:border-[#313035] dark:bg-[#27262b]">
            <TabsTrigger
              onClick={() => handleTabChange(EventState.UPCOMING)}
              value={EventState.UPCOMING}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTabChange(EventState.PAST)}
              value={EventState.PAST}
            >
              Past
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <FilterCard />
      <div>
        <a
          href="https://docs.google.com/spreadsheets/d/1P6ut7vL-gXKbeDeh3nuPqBjoCupjIt87Sw7TnhumBSU/edit#gid=1781893986"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Back to Google Sheet
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-up-right ml-1 inline opacity-40"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  )
}
