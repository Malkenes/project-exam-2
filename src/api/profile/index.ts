import { ProfileResponse } from "../../shared/types";
import { createOptions, handleResponse } from "../../utils/api";

export const getProfile = async (
  accessToken: string,
  name: string | undefined,
): Promise<ProfileResponse> => {
  const options = createOptions("GET", accessToken);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/profiles/${name}?_bookings=true&_venues=true`,
    options,
  );
  return handleResponse(response);
};

export const updateProfile = async (
  accessToken: string,
  name: string,
  data: object,
) => {
  const options = createOptions("PUT", accessToken, data);
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/profiles/${name}`,
    options,
  );
  return handleResponse(response);
};
