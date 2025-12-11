import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleBar from "./ScheduleBar";

describe("ScheduleBar", () => {
  test("renders location input and dropdowns", () => {
    render(
      <ScheduleBar
        location="New York"
        weekday="Friday"
        timeRange="Afternoon"
        setLocation={() => {}}
        setWeekday={() => {}}
        setTimeRange={() => {}}
      />
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

    render(
      <ScheduleBar
        location="NY"
        weekday="Friday"
        timeRange="Afternoon"
        setLocation={() => {}}
        setWeekday={setWeekday}
        setTimeRange={setTimeRange}
      />
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
