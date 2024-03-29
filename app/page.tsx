import EventsColumn from "@/components/EventsColumn"
import FiltersColumn from "@/components/Filters/FiltersColumn"

export default async function IndexPage() {
  return (
    <>
      <div className="relative mx-auto my-8 flex flex-col justify-center sm:w-full sm:flex-row lg:w-3/4">
        <EventsColumn />
        <FiltersColumn />
      </div>
    </>
  )
}
