export type Chore = {
  name: string;
  start: Date;
  done: Date[];
  type: "daily" | "weekly";
  // 0 is sunday, to keep this consistent with Date.getDay()
  daysOfTheWeek?: [0?, 1?, 2?, 3?, 4?, 5?, 6?];
};
