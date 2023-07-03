import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterCard from "@/components/Filters/FiltersCard"

export default async function Filters() {
  return (
    <div className="mx-8">
      <Calendar />
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 border-[#e3e3e3] bg-gray-200 dark:border-[#313035] dark:bg-[#27262b]">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
      </Tabs>
      <FilterCard />
    </div>
  )
}
