import React from "react";
import CalendarCell from "./ui/calendarCell";
import CalendarRow from "./ui/calendarRow";
import { Text } from "react-native";

type CalendarProps = {
  date: Date;
};

// magic number from config
// 0 means sunday, 1 means monday
const weekStartDay = 1;

const getPreviousStartOfTheWeek = (date: Date, startOfTheWeek = 0) => {
  if (date.getDay() === startOfTheWeek) return date;
  const prevDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1,
  );
  return getPreviousStartOfTheWeek(prevDay, startOfTheWeek);
};

const Calendar = ({ date }: CalendarProps) => {
  const rows = 10;
  const renderedRows: Array<Date>[] = [];

  const month = date.getMonth();
  const year = date.getFullYear();

  const startDate = getPreviousStartOfTheWeek(date, weekStartDay);

  for (let i = 0; i < rows; i++) {
    renderedRows.push([]);
  }
  renderedRows.forEach((row, rowIndex) => {
    for (let day = 0; day < 7; day++) {
      const cellDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + rowIndex * 7 + day,
      );
      row.push(cellDate);
    }
  });

  return (
    <div className="h-max">
      <Text className="text-xl text-blue-500">calendar</Text>
      <div className="relative">
        {renderedRows.map((row, i) => (
          <CalendarRow key={row[0].toDateString()}>
            {row.map((cellDate) => (
              <CalendarCell key={cellDate.toDateString()} date={cellDate} />
            ))}
          </CalendarRow>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
