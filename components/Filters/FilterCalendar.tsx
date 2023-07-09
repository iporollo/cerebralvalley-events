"use client"

import { useState } from "react"
import useStore from "@/src/store"
import { format, set } from "date-fns"

import { Calendar } from "@/components/ui/calendar"

export default async function FilterCalendar() {
  const [selected, setSelected] = useState<Date>()
  const setShowPastEvents = useStore((state: any) => state.setShowPastEvents)

  const handleTabChange = (type: "upcoming" | "past") => {
    if (type === "past") {
      setShowPastEvents(true)
    } else {
      setShowPastEvents(false)
    }
  }

  return (
    <Calendar
      mode="single"
      // selected={selected}
      // onSelect={(e) => {
      //   setSelected(new Date(e!))
      // }}
    />
  )
}
