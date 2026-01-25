import React from "react";
import { CalendarCell } from "./ui/calendarCell";
import { CalendarRow } from "./ui/calendarRow";

const rows = 100;
const renderedRows: Array<React.JSX.Element>[] = [];
for (let i = 0; i < rows; i++) {
  renderedRows.push([]);
}
renderedRows.forEach((row) => {
  for (let day = 0; day < 7; day++) {
    row.push(<CalendarCell />);
  }
});

export const Calendar = () => {
  return (
    <>
      <div>calendar</div>
      {renderedRows.map((row, i) => (
        <CalendarRow key={i}>{row.map((cell) => cell)}</CalendarRow>
      ))}
    </>
  );
};
