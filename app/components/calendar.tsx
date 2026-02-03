import React, { useEffect, useRef, useState } from "react";
import CalendarCell from "./ui/calendarCell";
import CalendarRow from "./ui/calendarRow";
import { View, VirtualizedList } from "react-native";

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
  const month = date.getMonth();
  const year = date.getFullYear();
  const initialIndex = useRef(100);
  const virtualizedListRef = useRef(null);

  const [dates, setDates] = useState<Array<Date[]>>([]);

  const startDate = getPreviousStartOfTheWeek(date, weekStartDay);

  const generateWeek = (startDate: Date) => {
    const row: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const cellDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + day,
      );
      row.push(cellDate);
    }
    return row;
  };

  const generateInitialDates = () => {
    const rows: Array<Date>[] = [];

    // generate rows before today
    for (let i = 100; i > 0; i--) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() - i * 7);
      rows.push(generateWeek(cellDate));
    }

    // add this week
    const cellDate = new Date(startDate);
    rows.push(generateWeek(cellDate));

    // generate rows after today
    for (let i = 1; i <= 100; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + i * 7);
      rows.push(generateWeek(cellDate));
    }
    return rows;
  };

  const loadMorePastDates = () => {
    const firstDate = dates[0][0];
    const newDates: Array<Date[]> = [];

    for (let i = 20; i > 0; i--) {
      const cellDate = new Date(firstDate);
      cellDate.setDate(cellDate.getDate() - i * 7);
      newDates.push(generateWeek(cellDate));
    }

    setDates((prev) => [...newDates, ...prev]);
  };

  const loadMoreFutureDates = () => {
    const lastRow = dates[dates.length - 1];
    const lastDate = lastRow[lastRow.length - 1];
    const newDates: Array<Date[]> = [];

    for (let i = 1; i <= 20; i++) {
      const cellDate = new Date(lastDate);
      cellDate.setDate(cellDate.getDate() + i * 7);
      newDates.push(generateWeek(cellDate));
    }

    setDates((prev) => [...prev, ...newDates]);
  };

  useEffect(() => {
    setDates(generateInitialDates());
  }, []);

  const getItem = (_data: unknown, index: number): Date[] => dates[index];

  const getItemCount = (_data: unknown) => dates.length;
  return (
    <View className="flex-1 h-full w-[240px]">
      <VirtualizedList
        className="flex-1 web:h-screen"
        ref={virtualizedListRef}
        initialNumToRender={200}
        data={dates}
        renderItem={({ item }) => (
          <CalendarRow key={item[0].toDateString()}>
            {item.map((cellDate) => (
              <CalendarCell key={cellDate.toDateString()} date={cellDate} />
            ))}
          </CalendarRow>
        )}
        getItem={getItem}
        getItemCount={getItemCount}
        initialScrollIndex={initialIndex.current}
        getItemLayout={(_data, index) => ({
          length: 24,
          offset: 24 * index,
          index: index,
        })}
        onStartReached={loadMorePastDates}
        onStartReachedThreshold={0.1}
        onEndReached={loadMoreFutureDates}
        onEndReachedThreshold={0.1}
      ></VirtualizedList>
    </View>
  );
};

export default Calendar;
