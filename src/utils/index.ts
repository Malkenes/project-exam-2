import { bookingInVenue } from "../shared/types";

export const formatDate = (date: string) => {
  const result = new Date(date);
  const string = result.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return string;
};

export const isExpired = (date: string) => {
  const result = new Date(date);
  const current = new Date();
  return result < current;
};

export function getFullyBookedDates(
  maxGuests: number,
  bookings: bookingInVenue[],
) {
  const getDateRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dateCounts = new Map();

  bookings.forEach(({ dateFrom, dateTo, guests }) => {
    const datesInRange = getDateRange(new Date(dateFrom), new Date(dateTo));
    datesInRange.forEach((date) => {
      dateCounts.set(date, (dateCounts.get(date) || 0) + guests);
    });
  });

  const fullyBookedDates: Date[] = [];
  dateCounts.forEach((guestCount, date) => {
    if (guestCount >= maxGuests) {
      fullyBookedDates.push(date);
    }
  });

  return fullyBookedDates;
}
