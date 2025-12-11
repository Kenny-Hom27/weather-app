import { getFutureDatesForWeekday } from "./getFutureDates";
import { fetchWeatherRange } from "../services/fetchWeatherRange";
import type { WeatherDay } from "../types/types";

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
