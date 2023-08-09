"use client"

import * as React from "react"
import { useFilterStore } from "@/src/store"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date()
  const weekFromToday = addDays(today, 7)

  const dateFilter = useFilterStore((state: any) => state.dateFilter)
  const setDateFilter = useFilterStore((state: any) => state.setDateFilter)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger className="w-max" asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFilter?.from ? (
              dateFilter.to ? (
                <>
                  {format(dateFilter.from, "LLL dd")} -{" "}
                  {format(dateFilter.to, "LLL dd")}
                </>
              ) : (
                format(dateFilter.from, "LLL dd")
              )
            ) : (
              <span>Filter by date</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus // Not sure what this does... but it was in the shadcn example
            mode="range"
            defaultMonth={dateFilter?.from}
            selected={dateFilter}
            onSelect={setDateFilter}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
