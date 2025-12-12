import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ScheduleBar } from "./ScheduleBar";
import { WeatherContext } from "../../contexts/useWeatherContext";
import type { TimeRangeKey, WeatherDay } from "../../types/types";

interface MockContextValues {
  location?: string;
  weekday?: string;
  timeRange?: TimeRangeKey;
  dates?: Date[];
  weatherByDate?: Record<string, WeatherDay>;
  setLocation?: (value: string) => void;
  setWeekday?: (value: string) => void;
  setTimeRange?: (value: TimeRangeKey) => void;
}

// Helper to create a test wrapper with mock context
const createMockProvider = (mockValues: MockContextValues = {}) => {
  const defaultValues = {
    location: "New York, NY",
    weekday: "Friday",
    timeRange: "Afternoon" as TimeRangeKey,
    dates: [] as Date[],
    weatherByDate: {} as Record<string, WeatherDay>,
    setLocation: vi.fn(),
    setWeekday: vi.fn(),
    setTimeRange: vi.fn(),
    ...mockValues,
  };

  return ({ children }: { children: React.ReactNode }) => (
    <WeatherContext.Provider value={defaultValues}>
      {children}
    </WeatherContext.Provider>
  );
};

describe("ScheduleBar", () => {
  test("renders location input and dropdowns", () => {
    const MockProvider = createMockProvider({
      location: "New York",
      weekday: "Friday",
      timeRange: "Afternoon",
    });

    render(
      <MockProvider>
        <ScheduleBar />
      </MockProvider>
    );

    // Check the input value
    expect(screen.getByDisplayValue("New York")).toBeInTheDocument();

    // Check weekday select
    expect(screen.getByDisplayValue("Friday")).toBeInTheDocument();

    // Check time range select
    expect(screen.getByDisplayValue("Afternoon")).toBeInTheDocument();
  });

  test("calls setters when dropdowns change", () => {
    const setWeekday = vi.fn();
    const setTimeRange = vi.fn();

    const MockProvider = createMockProvider({
      location: "NY",
      weekday: "Friday",
      timeRange: "Afternoon",
      setWeekday,
      setTimeRange,
    });

    render(
      <MockProvider>
        <ScheduleBar />
      </MockProvider>
    );

    fireEvent.change(screen.getByDisplayValue("Friday"), {
      target: { value: "Monday" },
    });

    expect(setWeekday).toHaveBeenCalledWith("Monday");

    fireEvent.change(screen.getByDisplayValue("Afternoon"), {
      target: { value: "Morning" },
    });

    expect(setTimeRange).toHaveBeenCalledWith("Morning");
  });
});
