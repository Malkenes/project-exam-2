export const booking = async (accessToken: string, data: {}) => {
  const { VITE_NOROFF_API_KEY, VITE_NOROFF_BASE } = import.meta.env;
  const options: RequestInit = {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${VITE_NOROFF_BASE}holidaze/bookings`, options);
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string = result?.errors[0]?.message;
    throw new Error(errorMessage);
  }
  return result;
};

export const deleteBooking = async (accessToken: string, id: string) => {
  const { VITE_NOROFF_API_KEY, VITE_NOROFF_BASE } = import.meta.env;
  const options: RequestInit = {
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
  };
  const response = await fetch(
    `${VITE_NOROFF_BASE}holidaze/bookings/${id}`,
    options,
  );
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string = result?.errors[0]?.message;
    throw new Error(errorMessage);
  }
  return result;
};

export const getBooking = async (accessToken: string, id: string) => {
  const { VITE_NOROFF_API_KEY, VITE_NOROFF_BASE } = import.meta.env;
  const options: RequestInit = {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": VITE_NOROFF_API_KEY,
      "content-type": "application/json",
    },
  };
  const response = await fetch(
    `${VITE_NOROFF_BASE}holidaze/bookings/${id}?_venue=true`,
    options,
  );
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string = result?.errors[0]?.message;
    throw new Error(errorMessage);
  }
  return result;
};
