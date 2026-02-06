import React, { PropsWithChildren } from "react";
import { View } from "react-native";

type Props = PropsWithChildren<{}>;

const CalendarRow = ({ children }: Props) => {
  return <View className="flex flex-row">{children}</View>;
};

export default CalendarRow;
