import React from "react";

export type CalendarCellProps = {
  date: Date;
};

export const CalendarCell = ({ date }: CalendarCellProps) => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isEvenMonth = date.getMonth() % 2;
  return (
    <div
      className={`flex justify-center flex-grow w-8 box-border  border ${isToday ? "border-red-600 border-2" : "border-slate-700"} ${isEvenMonth ? "bg-slate-100" : "bg-slate-200"}`}
    >
      {date.getDate()}
    </div>
  );
};
