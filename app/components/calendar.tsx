import React, { useEffect, useRef, useState } from "react";
import CalendarCell from "./ui/calendarCell";
import CalendarRow from "./ui/calendarRow";
import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

type CalendarProps = {
  date: Date;
  selectedChores: Boolean[];
};

// magic number from config
// 0 means sunday, 1 means monday
const weekStartDay = 1;

const getPreviousStartOfTheWeek = (date: Date, startOfTheWeek = 0) => {
  if (date.getDay() === startOfTheWeek) return date;
  const prevDay = new Date(date);
  prevDay.setDate(date.getDate() - 1);
  return getPreviousStartOfTheWeek(prevDay, startOfTheWeek);
};

const Calendar = ({ date }: CalendarProps) => {
  const initialIndex = useRef(100);
  const flatListRef = useRef<FlatList>(null);

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
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Prevent scrolling to the very top - otherwise the view sticks to the top and keeps scrolling up
    if (scrollY < 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 1, // Just 1px down from top
          animated: false,
        });
      }, 10);
    }
  };
  return (
    <View className="flex-1 h-full w-[240px]">
      <FlatList
        className="flex-1 web:h-screen"
        ref={flatListRef}
        initialNumToRender={200}
        data={dates}
        renderItem={({ item }) => (
          <CalendarRow key={item[0].toDateString()}>
            {item.map((cellDate: Date) => (
              <CalendarCell key={cellDate.toDateString()} date={cellDate} />
            ))}
          </CalendarRow>
        )}
        keyExtractor={(date, _index) => date[0].toDateString()}
        initialScrollIndex={initialIndex.current}
        getItemLayout={(_data, index) => ({
          length: 24,
          offset: 24 * index,
          index: index,
        })}
        onStartReached={loadMorePastDates}
        onStartReachedThreshold={0.5}
        onEndReached={loadMoreFutureDates}
        onEndReachedThreshold={0.5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 50,
        }}
        onScroll={handleScroll}
      ></FlatList>
    </View>
  );
};

export default Calendar;
