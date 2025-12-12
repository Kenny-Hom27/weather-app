import { DAYS } from "../constants/constants";

export const getFutureDatesForWeekday = (weekday: string, count: number) => {
  const target = DAYS.indexOf(weekday);

  const now = new Date();
  const today = now.getDay();
  const diff = (target + 7 - today) % 7;

  const first = new Date(now);
  first.setDate(now.getDate() + diff);

  const results = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(first);
    d.setDate(first.getDate() + i * 7);
    results.push(d);
  }

  return results;
};
