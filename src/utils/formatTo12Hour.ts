/**
 * Converts a 24-hour time string to 12-hour format with AM/PM suffix.
 *
 * Handles time strings that may include date components by extracting only the time portion.
 * Supports formats like "14:30" or "2025-01-10 14:30:00".
 *
 * @param time24 - Time string in 24-hour format (e.g., "14:30" or "14:30:00")
 * @returns Time string in 12-hour format with AM/PM (e.g., "2:30 PM")
 *
 * @example
 * ```ts
 * formatTo12Hour("14:30");      // Returns: "2:30 PM"
 * formatTo12Hour("09:15");      // Returns: "9:15 AM"
 * formatTo12Hour("00:00");      // Returns: "12:00 AM"
 * formatTo12Hour("23:45:00");   // Returns: "11:45 PM"
 * ```
 */
export const formatTo12Hour = (time24: string): string => {
  // Handle datetime strings that might have date part - extract time portion
  const parts = time24.split(" ");
  const timePart = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  const [hours, minutes] = timePart.split(":");
  const hour24 = parseInt(hours, 10);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const mins = minutes || "00";
  return `${hour12}:${mins} ${ampm}`;
};
