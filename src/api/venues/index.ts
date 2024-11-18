import { BaseVenue, VenueResponse } from "../../shared/types";
export const fetchData = async (url: string): Promise<VenueResponse> => {
  const { VITE_NOROFF_API_KEY, VITE_NOROFF_BASE } = import.meta.env;

  const options: RequestInit = {
    method: "get",
    headers: {
      "X-Noroff-API-Key": VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
  };
  const response = await fetch(VITE_NOROFF_BASE + url, options);
  const result = await response.json();
  return result;
};

export const fetchVenue = async (id: string): Promise<VenueResponse> => {
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
