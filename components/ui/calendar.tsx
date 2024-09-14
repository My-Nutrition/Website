"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateRange, DayPicker, rangeIncludesDate } from "react-day-picker"
import { endOfWeek, startOfWeek } from "date-fns"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // const [selectedRange, setSelectedRange] = useState<
  //   { from: Date; to: Date } | undefined
  // >(undefined)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const range = {
        from: selectedDate,
        to: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate() + 6,
        ),
      }
      setSelectedRange(range)
      props.onSelect?.(range)
    }
  }
  const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      modifiers={{
        selected: selectedWeek,
        range_start: selectedWeek?.from,
        range_end: selectedWeek?.to,
        range_middle: (date: Date) =>
          selectedWeek
            ? rangeIncludesDate(date, selectedWeek, { excludeEnds: true })
            : false,
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-md font-medium",
        nav: "mt-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        chevron: "h-4 w-4",
        button_previous: "absolute left-10",
        button_next: "absolute right-6",
        table: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between mb-2", // Align weekdays in a row above the month days
        weekday:
          "w-9 text-center font-semibold text-[0.9rem] text-muted-foreground",
        row: "flex w-full",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      // selected={selectedRange}
      onDayClick={(day, modifiers) => {
        if (modifiers.selected) {
          setSelectedWeek(undefined) // clear the selection if the day is already selected
          return
        }
        setSelectedWeek({
          from: startOfWeek(day),
          to: endOfWeek(day),
        })
      }}
      modifiersClassNames={{
        selected: "bg-green-500 text-white",
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
