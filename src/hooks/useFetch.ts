import { useEffect, useState } from "react";
import { fetchProfile } from "../api/profile";
import { fetchVenue } from "../api/venues";
import { useProfileStore } from "../stores/useProfileStore";
import { useUserStore } from "../stores/useUserStore";

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
