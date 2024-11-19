const createHeaders = (accessToken?: string): HeadersInit => {
  const headers: HeadersInit = {
    "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

export const handleResponse = async (response: Response) => {
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string =
      result?.errors?.[0]?.message || "An error occurred";
    throw new Error(errorMessage);
  }
  return result;
};

export const createOptions = (
  method: string,
  accessToken?: string,
  body?: object,
): RequestInit => ({
  method,
  headers: createHeaders(accessToken),
  ...(body && { body: JSON.stringify(body) }),
});
