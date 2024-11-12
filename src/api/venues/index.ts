import { BaseVenue, VenueResponse } from "../../shared/types";
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

export const createVenue = async (
  accessToken: string,
  data: BaseVenue,
): Promise<VenueResponse> => {
  const options: RequestInit = {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues`,
    options,
  );
  const result = await response.json();
  return result;
};
