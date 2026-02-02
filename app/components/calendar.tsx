import React from "react";
import { CalendarCell } from "./ui/calendarCell";
import { CalendarRow } from "./ui/calendarRow";
import { Text } from "react-native";

type CalendarProps = {
  date: Date;
};

export const Calendar = ({ date }: CalendarProps) => {
  const rows = 10;
  const renderedRows: Array<React.JSX.Element>[] = [];
  for (let i = 0; i < rows; i++) {
    renderedRows.push([]);
  }
  renderedRows.forEach((row, rowIndex) => {
    for (let day = 0; day < 7; day++) {
      const cellDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + rowIndex * 7 + day,
      );
      row.push(
        <CalendarCell key={"" + rowIndex + "-" + date} date={cellDate} />,
      );
    }
  });

  return (
    <div className="h-max">
      <Text className="text-xl text-blue-500">calendar</Text>
      <div className="relative">
        {renderedRows.map((row, i) => (
          <CalendarRow key={i}>{row.map((cell) => cell)}</CalendarRow>
        ))}
      </div>
    </div>
  );
};
