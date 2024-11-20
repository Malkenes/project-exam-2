import { BookingResponse } from "../../shared/types";
import { createOptions, handleResponse } from "../../utils/api";

interface updateRequest {
  dateFrom: Date;
  dateTo: Date;
  guests: number;
}

interface createRequest extends updateRequest {
  venueId: string;
}

export const getBooking = async (
  accessToken: string,
  id: string,
): Promise<BookingResponse> => {
  const options = createOptions("GET", accessToken);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/bookings/${id}?_venue=true`,
    options,
  );
  return handleResponse(response);
};

export const createBooking = async (
  accessToken: string,
  data: createRequest,
) => {
  const options = createOptions("POST", accessToken, data);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/bookings`,
    options,
  );
  return handleResponse(response);
};

export const updateBooking = async (
  accessToken: string,
  id: string,
  data: updateRequest,
) => {
  const options = createOptions("PUT", accessToken, data);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/bookings/${id}`,
    options,
  );
  return handleResponse(response);
};

export const deleteBooking = async (accessToken: string, id: string) => {
  const options = createOptions("DELETE", accessToken);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/bookings/${id}`,
    options,
  );
  if (response.status === 204) {
    return response;
  }
  return handleResponse(response);
};
