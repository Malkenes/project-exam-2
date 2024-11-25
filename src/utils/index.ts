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

export const getThreeContinents = () => {
  const continents = [
    {
      name: "Europe",
      title: "Unveil Europe's Timeless Charms",
      image: "/img/jakub-zerdzicki-iR25yItFurM-unsplash.jpg",
    },
    {
      name: "Asia",
      title: "Journey Through Asia's Hidden Gems",
      image: "/img/zion-c-mIUWj_1zKUM-unsplash.jpg",
    },
    {
      name: "Africa",
      title: "Discover Africa's Wild Wonders",
      image: "/img/meg-von-haartman-ras46FLggW8-unsplash.jpg",
    },
    {
      name: "North America",
      title: "Experience North America's Diverse Adventures",
      image: "/img/ruoyu-li-593TaKHThg4-unsplash.jpg",
    },
    {
      name: "South America",
      title: "Unlock South America's Vibrant Spirit",
      image: "/img/agustin-diaz-gargiulo-7F65HDP0-E0-unsplash.jpg",
    },
    {
      name: "Australia",
      title: "Escape to Australia's Natural Beauty",
      image: "/img/chaz-mcgregor-f66-oTghELc-unsplash.jpg",
    },
  ];

  for (let i = continents.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [continents[i], continents[j]] = [continents[j], continents[i]];
  }

  return continents.slice(0, 3);
};
