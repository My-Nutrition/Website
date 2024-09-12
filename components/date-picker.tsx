"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
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
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 6),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <WeekDisplay startDate={date?.from || new Date()} />
      <Popover>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              if (range?.from) {
                const newTo = addDays(range.from, 6)
                if (range.to && (range.to < range.from || range.to > newTo)) {
                  setDate({
                    from: range.from,
                    to: newTo,
                  })
                } else {
                  setDate({
                    from: range.from,
                    to: addDays(range.from, 6),
                  })
                }
              } else {
                setDate(undefined)
              }
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
