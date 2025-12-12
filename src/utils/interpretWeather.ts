import type { WeatherCurrentConditions } from "../types/types";

export interface WeatherInterpretation {
  icon: string;
  message: string;
  result: string;
}

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
