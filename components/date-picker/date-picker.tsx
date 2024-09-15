"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { WeekDisplay } from "./week-display"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 8, 1),
    to: addDays(new Date(2024, 8, 1), 6),
  })

  const handleDayClick = (selectedDate: DateRange | undefined) => {
    if (selectedDate) {
      setDate({
        from: selectedDate,
        to: addDays(selectedDate.from, 6), // Create a 7-day range
      })
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {/* Displays the 7-day week starting from 'from' date */}
      <WeekDisplay startDate={date?.from || new Date()} />

      {/* Popover with the calendar */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-1">
            <ChevronLeft
              className="h-full border rounded-md cursor-pointer"
              onClick={() => {
                if (date?.from) {
                  const newFrom = addDays(date.from, -7)
                  setDate({
                    from: newFrom,
                    to: addDays(newFrom, 6),
                  })
                }
              }}
            />
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-fit justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
            <ChevronRight
              className="h-full border rounded-md cursor-pointer"
              onClick={() => {
                if (date?.from) {
                  const newFrom = addDays(date.from, 7)
                  setDate({
                    from: newFrom,
                    to: addDays(newFrom, 6),
                  })
                }
              }}
            />
          </div>
        </PopoverTrigger>

        {/* Calendar popover content */}
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single" // Single mode to allow single day selection
            defaultMonth={date?.from}
            selected={date?.from} // Only the start date is selected initially
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
