import type { WeatherCurrentConditions } from "../types/types";

export interface WeatherInterpretation {
  icon: string;
  message: string;
  result: string;
}

/**
 * Interprets weather conditions and returns a user-friendly interpretation with icon, message, and result.
 *
 * The function evaluates weather data based on priority rules:
 * 1. Rain probability (>30%) - returns rainy interpretation
 * 2. Snow conditions (temp <= 32°F and rain >20%) - returns snowy interpretation
 * 3. Wind speed (>15 mph) - returns windy interpretation
 * 4. Temperature ranges:
 *    - 60-75°F: Cool/Nice day
 *    - <50°F: Chilly
 *    - >85°F: Hot
 *    - Default: Sunny/Pleasant
 *
 * @param dayData - Current weather conditions data, or null/undefined if unavailable
 * @returns An object containing an emoji icon, user-friendly message, and result classification
 *
 * @example
 * ```ts
 * const interpretation = interpretWeather({
 *   temp: 72,
 *   windspeed: 5,
 *   precipprob: 10
 * });
 * // Returns: { icon: "☀️", message: "Nice day for a meetup", result: "Cool" }
 * ```
 */
export const interpretWeather = (
  dayData: WeatherCurrentConditions | null | undefined
): WeatherInterpretation => {
  if (!dayData) {
    return {
      icon: "❓",
      message: "Weather data unavailable",
      result: "Unknown",
    };
  }

  const temp = dayData.temp;
  const wind = dayData.windspeed;
  const rain = dayData.precipprob;

  // RAIN RULE
  if (rain > 30) {
    return {
      icon: "🌧️",
      message: "High chance of rain — consider backup plans",
      result: "Rainy",
    };
  }

  // SNOW RULE (optional)
  if (temp <= 32 && rain > 20) {
    return {
      icon: "❄️",
      message: "Snowy conditions — stay warm",
      result: "Snowy",
    };
  }

  // WIND RULE
  if (wind > 15) {
    return {
      icon: "💨",
      message: "Windy conditions — hold onto your hat",
      result: "Windy",
    };
  }

  // TEMPERATURE LOGIC
  if (temp >= 60 && temp <= 75) {
    return {
      icon: "☀️",
      message: "Nice day for a meetup",
      result: "Cool",
    };
  }

  if (temp < 50) {
    return {
      icon: "🌥️",
      message: "Chilly — bring layers",
      result: "Chilly",
    };
  }

  if (temp > 85) {
    return {
      icon: "🔥",
      message: "Hot day — stay hydrated",
      result: "HOT",
    };
  }

  // DEFAULT
  return {
    icon: "☀️",
    message: "Pleasant conditions for a meetup",
    result: "Sunny",
  };
};
