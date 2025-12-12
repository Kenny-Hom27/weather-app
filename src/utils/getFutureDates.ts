import { DAYS } from "../constants/constants";

/**
 * Generates an array of future dates for a specified weekday.
 *
 * Calculates the next occurrence of the given weekday from today, then returns
 * that date plus the same weekday for the specified number of weeks ahead.
 *
 * @param weekday - The target weekday name (e.g., "Monday", "Friday"). Must match a value in DAYS constant
 * @param count - The number of future dates to generate (defaults to 1 if not specified)
 * @returns An array of Date objects representing future occurrences of the specified weekday
 *
 * @example
 * ```ts
 * // Get next 3 Fridays
 * const fridays = getFutureDatesForWeekday("Friday", 3);
 * // Returns: [Date(2025-01-10), Date(2025-01-17), Date(2025-01-24)]
 * ```
 */
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
