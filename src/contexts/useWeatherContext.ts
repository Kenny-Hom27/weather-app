import { createContext, useContext } from "react";
import type { TimeRangeKey, WeatherDay } from "../types/types";

interface WeatherContextType {
  location: string;
  weekday: string;
  timeRange: TimeRangeKey;
  dates: Date[];
  weatherByDate: Record<string, WeatherDay>;
  setLocation: (value: string) => void;
  setWeekday: (value: string) => void;
  setTimeRange: (value: TimeRangeKey) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
