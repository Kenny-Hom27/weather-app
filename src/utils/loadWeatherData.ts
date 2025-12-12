import { getFutureDatesForWeekday } from "./getFutureDates";
import { fetchWeatherRange } from "../services/fetchWeatherRange";
import type { WeatherDay } from "../types/types";

/**
 * Loads weather data for a series of future dates matching a specific weekday.
 *
 * This function:
 * 1. Calculates future dates for the specified weekday
 * 2. Fetches weather data for the date range from the weather API
 * 3. Maps the weather data by date string (YYYY-MM-DD format) for easy lookup
 *
 * @param location - Location string (e.g., "New York, NY" or "Boston, MA")
 * @param weekday - Target weekday name (e.g., "Friday", "Monday")
 * @param count - Number of future dates to fetch weather for (default: 10)
 * @returns Promise resolving to an object containing:
 *   - dates: Array of Date objects for the calculated weekdays
 *   - weatherMap: Record mapping date strings (YYYY-MM-DD) to WeatherDay objects
 *
 * @example
 * ```ts
 * const { dates, weatherMap } = await loadWeatherData("New York, NY", "Friday", 5);
 * const weatherForFirstFriday = weatherMap[dates[0].toISOString().split("T")[0]];
 * ```
 */
export async function loadWeatherData(
  location: string,
  weekday: string,
  count: number = 10
): Promise<{
  dates: Date[];
  weatherMap: Record<string, WeatherDay>;
}> {
  // compute N dates for the weekday
  const dates = getFutureDatesForWeekday(weekday, count);

  const startISO = dates[0].toISOString().split("T")[0];
  const endISO = dates[dates.length - 1].toISOString().split("T")[0];

  // fetch weather for the full range
  const response = await fetchWeatherRange(location, startISO, endISO);

  const weatherMap: Record<string, WeatherDay> = {};
  response.days.forEach((day: WeatherDay) => {
    weatherMap[day.datetime] = day;
  });

  return { dates, weatherMap };
}
