import { useEffect, useState } from "react";
import { fetchProfile } from "../api/profile";
import { fetchVenue, fetchData as ApiFetchData } from "../api/venues";
import { useProfileStore } from "../stores/useProfileStore";
import { useUserStore } from "../stores/useUserStore";
import { Venue } from "../shared/types";
import { getBooking } from "../api/booking";

export const useFetch = (name: string | undefined) => {
  const setProfile = useProfileStore((state) => state.setState);
  const accessToken = useUserStore((state) => state.userData.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile(name, accessToken);
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

export const useFetchBooking = (id: string) => {
  const accessToken = useUserStore((state) => state.userData.accessToken);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBooking(accessToken, id);
        const response2 = await ApiFetchData(
          `holidaze/venues/${response.data.venue.id}?_bookings=true`,
        );
        setData({ booking: response.data, venue: response2.data });
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
