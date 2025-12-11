import type { TIME_RANGES } from "../constants/constants";

export type TimeRangeKey = keyof typeof TIME_RANGES;

export interface WeatherApiResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: WeatherDay[];
  currentConditions?: WeatherCurrentConditions;
}

export interface WeatherDay {
  datetime: string; // "2025-12-10"
  datetimeEpoch: number; // unix timestamp
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax?: number;
  feelslikemin?: number;
  feelslike?: number;
  humidity: number;
  precip: number;
  precipprob: number;
  windspeed: number;
  windgust?: number;
  winddir: number;
  conditions: string; // "Partially cloudy"
  description?: string;

  hours?: WeatherHour[]; // hourly data if included=hours
}

export interface WeatherHour {
  datetime: string; // "12:00:00"
  datetimeEpoch: number;
  temp: number;
  humidity: number;
  windspeed: number;
  windgust?: number;
  winddir: number;
  precip: number;
  precipprob: number;
  conditions: string;
  icon?: string; // "rain" | "cloudy" etc
}

export interface WeatherCurrentConditions {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  humidity: number;
  windspeed: number;
  windgust?: number;
  winddir: number;
  precip: number;
  precipprob: number;
  conditions: string;
  icon?: string;
}

export interface LocationResult {
  id: number | string;
  name: string;
  admin1?: string;
  country: string;
  [key: string]: unknown;
}

export interface DayData {
  temp: number;
  humidity: number;
  windspeed: number;
  precipprob: number;
}
