import * as React from "react"
import { format, addDays, startOfWeek } from "date-fns"

interface WeekDisplayProps {
  startDate: Date
}

export function WeekDisplay({ startDate }: WeekDisplayProps) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  return (
    <div className="grid grid-cols-7 border gap-40 rounded-md px-24">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col items-center py-2">
          <span className="font-light">{format(day, "dd")}</span>
          <span className="text-xl tracking-wide font-bold">
            {format(day, "EEE")}
          </span>
        </div>
      ))}
    </div>
  )
}
