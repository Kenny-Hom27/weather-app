import { render, screen } from "@testing-library/react";
import { ForecastCard } from "./ForecastCard";
import type { WeatherDay } from "../../types/types";

const mockDay = {
  datetime: "2025-05-01",
  temp: 68,
  humidity: 45,
  windspeed: 7,
  hours: [],
} as unknown as WeatherDay;

describe("ForecastCard", () => {
  test("renders loading state when no data provided", () => {
    render(
      <ForecastCard
        label="Friday"
        dayData={undefined}
        timeRange={{ start: 8, end: 12 }}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays temperature when dayData exists", () => {
    render(
      <ForecastCard
        label="Friday"
        dayData={mockDay}
        timeRange={{ start: 8, end: 12 }}
      />
    );
    expect(screen.getByText(/68°F/)).toBeInTheDocument();
  });

  test("shows 'hourly data unavailable' when no hours exist", () => {
    render(
      <ForecastCard
        label="Friday"
        dayData={{ ...mockDay, hours: undefined }}
        timeRange={{ start: 8, end: 12 }}
      />
    );
    expect(screen.getByText(/Hourly data unavailable/i)).toBeInTheDocument();
  });
});
