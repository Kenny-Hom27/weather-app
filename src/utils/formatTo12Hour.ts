// Convert 24-hour time to 12-hour format with AM/PM
export const formatTo12Hour = (time24: string): string => {
  const timePart = time24.split(" ")[0]; // Handle datetime strings that might have date part
  const [hours, minutes] = timePart.split(":");
  const hour24 = parseInt(hours, 10);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const mins = minutes || "00";
  return `${hour12}:${mins} ${ampm}`;
};
