import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventsColumn from "@/components/EventsColumn"
import FiltersColumn from "@/components/Filters/FiltersColumn"

export default async function IndexPage() {
  return (
    <>
      <div className="relative mx-auto my-8 flex flex-col justify-center md:w-full md:flex-row lg:w-3/4">
        <EventsColumn />
        <FiltersColumn />
      </div>
    </>
  )
}
