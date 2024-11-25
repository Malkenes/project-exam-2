import { BaseVenue, Venue, VenueResponse } from "../../shared/types";
import { createOptions, handleResponse } from "../../utils/api";
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

export const getVenue = async (id: string): Promise<VenueResponse> => {
  const options = createOptions("GET");
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues/${id}?_bookings=true`,
    options,
  );
  return handleResponse(response);
};

export const getAllVenues = async () => {
  const options = createOptions("GET");
  let allVenues: Venue[] = [];
  let page = 1;
  const limit = 100;
  while (true) {
    const response = await fetch(
      `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues?limit=${limit}&page=${page}`,
      options,
    );
    const result = await response.json();
    if (result.meta.isLastPage) {
      break;
    }
    allVenues = [...allVenues, ...result.data];
    page++;
  }
  return allVenues;
};
export const createVenue = async (
  accessToken: string,
  data: BaseVenue,
): Promise<VenueResponse> => {
  const options = createOptions("POST", accessToken, data);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues`,
    options,
  );
  return handleResponse(response);
};

export const updateVenue = async (
  accessToken: string,
  id: string,
  data: object,
) => {
  const options = createOptions("PUT", accessToken, data);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues/${id}`,
    options,
  );
  return handleResponse(response);
};
export const deleteVenue = async (accessToken: string, id: string) => {
  const options = createOptions("DELETE", accessToken);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/venues/${id}`,
    options,
  );
  return handleResponse(response);
};
