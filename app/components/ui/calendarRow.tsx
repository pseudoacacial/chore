import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const CalendarRow = ({ children }: Props) => {
  return <div className="flex">{children}</div>;
};

export default CalendarRow;
