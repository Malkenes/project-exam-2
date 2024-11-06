import { UpdateProfile, RegisterResponse } from "../../shared/types";

export const updateProfile = async (
  data: Partial<UpdateProfile>,
): Promise<RegisterResponse> => {
  const { accessToken, name, ...restData } = data;
  const options: RequestInit = {
    method: "put",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(restData),
  };

  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}holidaze/profiles/${name}`,
    options,
  );
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string = result?.errors[0]?.message;
    throw new Error(errorMessage);
  }

  return result;
};
