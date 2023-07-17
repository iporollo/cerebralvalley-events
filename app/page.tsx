import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FiltersColumn from "@/components/Filters/FiltersColumn"
import FiltersRow from "@/components/Filters/FiltersRow"
import SubmitEvent from "@/components/SubmitEvent"
import TimelineContainer from "@/components/Timeline/TimelineContainer"
import Spotlight, { SpotlightCard } from "@/components/spotlight"

export default async function IndexPage() {
  return (
    <>
      <div className="relative my-8 flex flex-col justify-center md:mx-auto md:w-full md:flex-row lg:mx-auto lg:w-3/4 xl:mx-auto">
        <FiltersRow />
        {/* <SubmitEvent /> */}
        <TimelineContainer />
        <FiltersColumn />
      </div>
    </>
  )
}
