import { VenueResponse } from "../../shared/types";
export const fetchVenue = async (
  id: string | undefined,
): Promise<VenueResponse> => {
  const options: RequestInit = {
    method: "get",
    headers: {
      "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues/${id}?_bookings=true`,
    options,
  );
  const result = await response.json();
  console.log(result);
  return result;
};
