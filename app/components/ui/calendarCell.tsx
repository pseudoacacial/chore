import React from "react";
import { useChoreStore } from "../../hooks/use-chore-store";
import { View, Text } from "react-native";

export type CalendarCellProps = {
  date: Date;
  selectedChores: Set<string>;
};

const CalendarCell = ({ date, selectedChores }: CalendarCellProps) => {
  const chores = useChoreStore((state) => state.chores);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isEvenMonth = date.getMonth() % 2;

  return (
    <View
      className={`flex justify-center flex-grow w-8 h-6 box-border  border ${isToday ? "border-red-600 border-2" : "border-slate-700"} ${isEvenMonth ? "bg-slate-100" : "bg-slate-200"}`}
    >
      <Text>{date.getDate()}</Text>
      {[...selectedChores].map((choreId, i) => {
        const chore = chores.get(choreId);

        return chore?.done
          .map((date) => date.toDateString())
          .includes(date.toDateString()) ? (
          <View style={{ backgroundColor: String(chore.color) }}>
            <Text>x</Text>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default CalendarCell;
