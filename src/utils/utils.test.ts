import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { interpretWeather } from "./interpretWeather";
import { getFutureDatesForWeekday } from "./getFutureDates";
import { formatTo12Hour } from "./formatTo12Hour";
import { loadWeatherData } from "./loadWeatherData";
import { fetchLocationResults } from "./fetchLocationResults";
import type { WeatherCurrentConditions, LocationResult } from "../types/types";
import * as fetchWeatherRangeModule from "../services/fetchWeatherRange";

// Mock the fetchWeatherRange service
vi.mock("../services/fetchWeatherRange", () => ({
  fetchWeatherRange: vi.fn(),
}));

describe("interpretWeather", () => {
  it("returns unknown interpretation for null/undefined data", () => {
    expect(interpretWeather(null)).toEqual({
      icon: "❓",
      message: "Weather data unavailable",
      result: "Unknown",
    });

    expect(interpretWeather(undefined)).toEqual({
      icon: "❓",
      message: "Weather data unavailable",
      result: "Unknown",
    });
  });

  it("returns rainy interpretation for high precipitation probability", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 70,
      humidity: 60,
      windspeed: 5,
      winddir: 180,
      precip: 0.5,
      precipprob: 35,
      conditions: "Rain",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "🌧️",
      message: "High chance of rain — consider backup plans",
      result: "Rainy",
    });
  });

  it("returns snowy interpretation for cold temperature with precipitation", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 30,
      humidity: 80,
      windspeed: 5,
      winddir: 180,
      precip: 0.2,
      precipprob: 25,
      conditions: "Snow",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "❄️",
      message: "Snowy conditions — stay warm",
      result: "Snowy",
    });
  });

  it("returns windy interpretation for high wind speed", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 65,
      humidity: 50,
      windspeed: 20,
      winddir: 180,
      precip: 0,
      precipprob: 10,
      conditions: "Windy",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "💨",
      message: "Windy conditions — hold onto your hat",
      result: "Windy",
    });
  });

  it("returns cool interpretation for ideal temperature range", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 70,
      humidity: 50,
      windspeed: 5,
      winddir: 180,
      precip: 0,
      precipprob: 10,
      conditions: "Clear",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "☀️",
      message: "Nice day for a meetup",
      result: "Cool",
    });
  });

  it("returns chilly interpretation for low temperature", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 45,
      humidity: 60,
      windspeed: 5,
      winddir: 180,
      precip: 0,
      precipprob: 10,
      conditions: "Clear",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "🌥️",
      message: "Chilly — bring layers",
      result: "Chilly",
    });
  });

  it("returns hot interpretation for high temperature", () => {
    const data: WeatherCurrentConditions = {
      datetime: "2025-01-10",
      datetimeEpoch: 1736467200,
      temp: 90,
      humidity: 50,
      windspeed: 5,
      winddir: 180,
      precip: 0,
      precipprob: 10,
      conditions: "Clear",
    };

    expect(interpretWeather(data)).toEqual({
      icon: "🔥",
      message: "Hot day — stay hydrated",
      result: "HOT",
    });
  });
});

describe("getFutureDatesForWeekday", () => {
  beforeEach(() => {
    // Mock current date to ensure consistent test results
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-10")); // Friday
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns future dates for the specified weekday", () => {
    const dates = getFutureDatesForWeekday("Friday", 3);
    expect(dates).toHaveLength(3);
    expect(dates[0].getDay()).toBe(5); // Friday is day 5
    expect(dates[1].getDay()).toBe(5);
    expect(dates[2].getDay()).toBe(5);
  });

  it("returns dates spaced one week apart", () => {
    const dates = getFutureDatesForWeekday("Monday", 2);
    expect(dates).toHaveLength(2);
    const diff = dates[1].getTime() - dates[0].getTime();
    const daysDiff = diff / (1000 * 60 * 60 * 24);
    expect(daysDiff).toBe(7);
  });

  it("handles single date request", () => {
    const dates = getFutureDatesForWeekday("Saturday", 1);
    expect(dates).toHaveLength(1);
    expect(dates[0].getDay()).toBe(6); // Saturday is day 6
  });
});

describe("formatTo12Hour", () => {
  it("converts 24-hour format to 12-hour with AM/PM", () => {
    expect(formatTo12Hour("14:30")).toBe("2:30 PM");
    expect(formatTo12Hour("09:15")).toBe("9:15 AM");
    expect(formatTo12Hour("00:00")).toBe("12:00 AM");
    expect(formatTo12Hour("12:00")).toBe("12:00 PM");
    expect(formatTo12Hour("23:45")).toBe("11:45 PM");
  });

  it("handles time strings with seconds", () => {
    expect(formatTo12Hour("14:30:00")).toBe("2:30 PM");
    expect(formatTo12Hour("09:15:30")).toBe("9:15 AM");
  });

  it("handles datetime strings with date components", () => {
    expect(formatTo12Hour("2025-01-10 14:30:00")).toBe("2:30 PM");
    expect(formatTo12Hour("2025-01-10 09:15")).toBe("9:15 AM");
  });

  it("handles edge cases", () => {
    expect(formatTo12Hour("01:00")).toBe("1:00 AM");
    expect(formatTo12Hour("13:00")).toBe("1:00 PM");
    expect(formatTo12Hour("11:59")).toBe("11:59 AM");
    expect(formatTo12Hour("23:59")).toBe("11:59 PM");
  });
});

describe("loadWeatherData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads weather data for future dates", async () => {
    const mockWeatherResponse = {
      queryCost: 1,
      latitude: 40.7128,
      longitude: -74.006,
      resolvedAddress: "New York, NY",
      address: "New York, NY",
      timezone: "America/New_York",
      tzoffset: -5,
      days: [
        {
          datetime: "2025-01-10",
          datetimeEpoch: 1736467200,
          tempmax: 70,
          tempmin: 50,
          temp: 60,
          humidity: 60,
          precip: 0,
          precipprob: 0,
          windspeed: 10,
          winddir: 180,
          conditions: "Clear",
        },
      ],
    };

    vi.mocked(fetchWeatherRangeModule.fetchWeatherRange).mockResolvedValue(
      mockWeatherResponse
    );

    const result = await loadWeatherData("New York, NY", "Friday", 1);

    expect(result.dates).toHaveLength(1);
    expect(result.weatherMap).toHaveProperty("2025-01-10");
    expect(result.weatherMap["2025-01-10"]).toEqual(
      mockWeatherResponse.days[0]
    );
  });

  it("maps weather data by date string", async () => {
    const mockWeatherResponse = {
      queryCost: 1,
      latitude: 40.7128,
      longitude: -74.006,
      resolvedAddress: "New York, NY",
      address: "New York, NY",
      timezone: "America/New_York",
      tzoffset: -5,
      days: [
        {
          datetime: "2025-01-17",
          datetimeEpoch: 1737072000,
          tempmax: 72,
          tempmin: 55,
          temp: 65,
          humidity: 65,
          precip: 0.1,
          precipprob: 20,
          windspeed: 12,
          winddir: 200,
          conditions: "Partly Cloudy",
        },
      ],
    };

    vi.mocked(fetchWeatherRangeModule.fetchWeatherRange).mockResolvedValue(
      mockWeatherResponse
    );

    const result = await loadWeatherData("New York, NY", "Friday", 1);

    expect(result.weatherMap["2025-01-17"]).toBeDefined();
    expect(result.weatherMap["2025-01-17"].datetime).toBe("2025-01-17");
  });
});

describe("fetchLocationResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("returns empty array for queries shorter than 2 characters", async () => {
    const controller = new AbortController();
    const result = await fetchLocationResults("a", controller.signal);
    expect(result).toEqual([]);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("fetches and returns location results", async () => {
    const mockResults: LocationResult[] = [
      {
        id: 1,
        name: "Boston",
        admin1: "MA",
        country: "USA",
      },
      {
        id: 2,
        name: "Boston",
        admin1: "ON",
        country: "Canada",
      },
    ];

    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: mockResults }),
    } as Response);

    const controller = new AbortController();
    const result = await fetchLocationResults("Boston", controller.signal);

    expect(result).toEqual(mockResults);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("geocoding-api.open-meteo.com"),
      expect.objectContaining({ signal: controller.signal })
    );
  });

  it("returns empty array when request is aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    // Mock fetch to throw AbortError
    vi.mocked(globalThis.fetch).mockImplementation(() => {
      const error = new Error("Aborted");
      error.name = "AbortError";
      return Promise.reject(error);
    });

    const result = await fetchLocationResults("Boston", controller.signal);

    expect(result).toEqual([]);
  });

  it("returns empty array on fetch error", async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error("Network error"));

    const controller = new AbortController();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchLocationResults("Boston", controller.signal);

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("returns empty array when API response is not ok", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const controller = new AbortController();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchLocationResults("Boston", controller.signal);

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("handles API response with no results", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: null }),
    } as Response);

    const controller = new AbortController();
    const result = await fetchLocationResults("InvalidCity", controller.signal);

    expect(result).toEqual([]);
  });
});
