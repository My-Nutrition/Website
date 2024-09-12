import * as React from "react";
import { format, addDays, startOfWeek } from "date-fns";

interface WeekDisplayProps {
  startDate: Date;
}

export const WeekDisplay: React.FC<WeekDisplayProps> = ({ startDate }) => {
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(startDate, { weekStartsOn: 0 }), i)
  );

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col items-center p-2 border">
          <span className="text-lg font-bold">{format(day, "EEE")}</span>
          <span>{format(day, "dd")}</span>
        </div>
      ))}
    </div>
  );
}
