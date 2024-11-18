import { eachDayOfInterval, isSameDay } from "date-fns";

// Helper function to check if a single date is fully booked
export const isDateFullyBooked = (date: Date, fullyBooked: Date[]): boolean => {
  return fullyBooked.some((fullDate) => isSameDay(fullDate, date));
};

// Helper function to check if any date in a range is fully booked
export const isRangeFullyBooked = (
  range: Date[],
  fullyBooked: Date[],
): boolean => {
  return range.some((date) => isDateFullyBooked(date, fullyBooked));
};

// Helper function to generate the range of dates
export const getRangeDates = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};
