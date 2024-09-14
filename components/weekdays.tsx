import React from 'react';

interface WeekdaysProps {
  from: Date;
  to: Date;
}

const Weekdays: React.FC<WeekdaysProps> = ({ from, to }) => {
  const days = [];
  let currentDate = new Date(from);

  while (currentDate <= to) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
      days.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div className="weekdays-container">
      {days.map((day, index) => (
        <div key={index}>{day.toDateString()}</div>
      ))}
    </div>
  );
}

export default Weekdays;
