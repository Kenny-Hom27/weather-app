import { useState, useEffect, type ReactNode } from "react";
import { loadWeatherData } from "../utils/loadWeatherData";
import type { TimeRangeKey, WeatherDay } from "../types/types";
import { WeatherContext } from "./useWeatherContext";

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>("New York, NY");
  const [weekday, setWeekday] = useState<string>("Friday");
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("Afternoon");
  const [dates, setDates] = useState<Date[]>([]);
  const [weatherByDate, setWeatherByDate] = useState<
    Record<string, WeatherDay>
  >({});

  useEffect(() => {
    async function load() {
      const { dates, weatherMap } = await loadWeatherData(location, weekday, 5);

      setDates(dates);
      setWeatherByDate(weatherMap);
    }

    load();
  }, [location, weekday]);

  return (
    <WeatherContext.Provider
      value={{
        location,
        weekday,
        timeRange,
        dates,
        weatherByDate,
        setLocation,
        setWeekday,
        setTimeRange,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
