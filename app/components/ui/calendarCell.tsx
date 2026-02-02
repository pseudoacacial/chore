import React from "react";

type CalendarCellProps = {
  date: Date;
};

export const CalendarCell = ({ date }: CalendarCellProps) => {
  return (
    <div className="flex justify-center flex-1 w-8 border">
      {date.getDate()}
    </div>
  );
};
