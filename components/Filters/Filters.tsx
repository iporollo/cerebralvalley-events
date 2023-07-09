"use client"

import useStore from "@/src/store"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterCalendar from "@/components/Filters/FilterCalendar"
import FilterCard from "@/components/Filters/FiltersCard"
import Search from "@/components/Search"

export default async function Filters() {
  const setShowPastEvents = useStore((state: any) => state.setShowPastEvents)

  const handleTabChange = (type: "upcoming" | "past") => {
    if (type === "past") {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }
  return (
    <div className="mx-8">
      {/* <Search /> */}
      <FilterCalendar />
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 border-[#e3e3e3] bg-gray-200 dark:border-[#313035] dark:bg-[#27262b]">
          <TabsTrigger
            onClick={() => handleTabChange("upcoming")}
            value="upcoming"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger onClick={() => handleTabChange("past")} value="past">
            Past
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <FilterCard />
    </div>
  )
}
