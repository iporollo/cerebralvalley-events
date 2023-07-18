"use client"

import useStore from "@/src/store"
import { EventState } from "@/src/utils/constants"

import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterCard from "@/components/Filters/FiltersCard"

export default function FiltersColumn() {
  const setShowPastEvents = useStore((state: any) => state.setShowPastEvents)

  const handleTabChange = (type: EventState.UPCOMING | EventState.PAST) => {
    if (type === EventState.PAST) {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }
  return (
    <div className="mx-8 hidden flex-col md:mx-2 md:flex">
      {/* <Search /> */}
      <Calendar />
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
      <FilterCard />
    </div>
  )
}
