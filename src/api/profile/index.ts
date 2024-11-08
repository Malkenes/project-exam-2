import { ProfileResponse } from "../../shared/types";

export const fetchProfile = async (
  name: string | undefined,
  accessToken: string,
): Promise<ProfileResponse> => {
  const options: RequestInit = {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/profiles/${name}?_bookings=true&_venues=true`,
    options,
  );
  const result = await response.json();
  return result;
};
