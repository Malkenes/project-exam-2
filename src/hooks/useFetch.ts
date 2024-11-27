import { useEffect, useState } from "react";
import { fetchData as ApiFetchData } from "../api/venues";
import { useUserStore } from "../stores/useUserStore";
import { bookingInVenue } from "../shared/types";
import { getBooking } from "../api/booking";

interface BookingData {
  id: string;
  guests: number;
  maxGuests: number;
  price: number;
  defaultDates: [Date, Date];
  bookings?: bookingInVenue[];
}

export const useFetchBooking = (id: string) => {
  const accessToken = useUserStore((state) => state.userData.accessToken);
  const [data, setData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await getBooking(accessToken, id);
        const venueResponse = await ApiFetchData(
          `holidaze/venues/${bookingResponse.data.venue.id}?_bookings=true`,
        );
        setData({
          id: bookingResponse.data.id,
          maxGuests: venueResponse.data.maxGuests,
          price: venueResponse.data.price,
          defaultDates: [
            new Date(bookingResponse.data.dateFrom),
            new Date(bookingResponse.data.dateTo),
          ],
          bookings: venueResponse.data.bookings,
          guests: bookingResponse.data.guests,
        });
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error.message);
        } else {
          setIsError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, isLoading, isError };
};
