import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const CalendarRow = ({ children }: Props) => {
  return <div className="flex">{children}</div>;
};
