import { render } from "@testing-library/react";
import { WeatherChart } from "./WeatherChart";
import type { WeatherDay } from "../../types/types";

const mockDay = {
  datetime: "2025-05-01",
  hours: [
    { datetime: "08:00", temp: 60, humidity: 40, windspeed: 5 },
    { datetime: "10:00", temp: 65, humidity: 42, windspeed: 6 },
  ],
} as unknown as WeatherDay;

describe("WeatherChart", () => {
  test("renders nothing if no hourly data", () => {
    const { container } = render(
      <WeatherChart
        dayData={{ ...mockDay, hours: undefined }}
        timeRange={{ start: 8, end: 12 }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders a chart container when hours exist", () => {
    const { container } = render(
      <WeatherChart dayData={mockDay} timeRange={{ start: 8, end: 12 }} />
    );

    // Chart.js renders a <canvas>; check presence
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
