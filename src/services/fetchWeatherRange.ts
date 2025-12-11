import type { WeatherApiResponse } from "../types/types";

const API_KEY = import.meta.env.VITE_VISUAL_CROSSING_KEY;

export async function fetchWeatherRange(
  location: string,
  start: string,
  end: string
): Promise<WeatherApiResponse> {
  const cacheKey = `weather:${location}:${start}:${end}`;

  // 1. Check cache
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as WeatherApiResponse;
    } catch (e) {
      console.log(e);
    }
  }

  // 2. Fetch from API
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}/${start}/${end}?unitGroup=us&include=days,hours&key=${API_KEY}&contentType=json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");

  const data = (await res.json()) as WeatherApiResponse;

  // 3. Save to cache
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch {
    // localStorage full or blocked — ignore
  }

  return data;
}
