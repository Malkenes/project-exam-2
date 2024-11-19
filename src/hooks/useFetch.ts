import { useEffect, useState } from "react";
import { getProfile as apiGetProfile } from "../api/profile";
import { fetchVenue, fetchData as ApiFetchData } from "../api/venues";
import { useProfileStore } from "../stores/useProfileStore";
import { useUserStore } from "../stores/useUserStore";
import { bookingInVenue, Venue } from "../shared/types";
import { getBooking } from "../api/booking";

export const useFetch = (name: string | undefined) => {
  const setProfile = useProfileStore((state) => state.setState);
  const accessToken = useUserStore((state) => state.userData.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await apiGetProfile(accessToken, name);
        setProfile(response.data);
        functiontesting();
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
    if (name && accessToken) {
      getProfile();
    }
  }, [name, setProfile]);
  return { accessToken, isLoading, isError };
};

export const functiontesting = async () => {
  const venues = useProfileStore.getState().venues;

  if (!venues || venues.length === 0) {
    console.warn("No venues found in the store.");
    return;
  }
  const updatedVenues = await Promise.all(
    venues.map(async (venue) => {
      const bookings = await fetchVenue(venue.id);
      console.log(bookings);
      return bookings.data;
    }),
  );

  console.log(updatedVenues);
  useProfileStore.setState({ venues: updatedVenues });
};

export const useFetchVenue = (url: string) => {
  const [data, setData] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiFetchData(url);
        setData(response.data);
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

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, isError };
};
interface BookingData {
  id: string;
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
