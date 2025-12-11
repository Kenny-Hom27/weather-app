import { render, screen, fireEvent } from "@testing-library/react";
import { LocationAutocomplete } from "./LocationAutocomplete";
import * as locationUtils from "../../utils/fetchLocationResults";

// Mock result returned from util
const mockResults = [{ id: 1, name: "Boston", admin1: "MA", country: "USA" }];

// Mock fetchLocationResults
vi.spyOn(locationUtils, "fetchLocationResults").mockResolvedValue(mockResults);

describe("LocationAutocomplete", () => {
  test("shows results and triggers onSelect when clicked", async () => {
    const handleSelect = vi.fn();

    render(<LocationAutocomplete value="" onSelect={handleSelect} />);

    const input = screen.getByPlaceholderText(/search for a city/i);

    // MUST focus so dropdown can open
    fireEvent.focus(input);

    // Trigger query state update
    fireEvent.change(input, { target: { value: "bos" } });

    // Wait for mocked results to appear
    const item = await screen.findByText(/boston/i);

    // Click the result
    fireEvent.click(item);

    // Expect onSelect to be called with formatted fullName
    expect(handleSelect).toHaveBeenCalledWith("Boston, MA, USA");

    // Input should update to selected value
    expect(screen.getByDisplayValue("Boston, MA, USA")).toBeInTheDocument();
  });
});
