import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Filters from "@/components/Filters/Filters"
import TimelineContainer from "@/components/Timeline/TimelineContainer"
import Spotlight, { SpotlightCard } from "@/components/spotlight"

export default async function IndexPage() {
  return (
    <>
      {/* <h1>Cerebral Valley Events</h1> */}
      <div className="relative mx-8 my-8 flex justify-center md:mx-auto md:w-3/4 lg:mx-auto lg:w-3/4 xl:mx-auto">
        <TimelineContainer />
        <Filters />
      </div>
    </>
  )
}
