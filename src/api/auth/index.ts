import { SignInResponse } from "../../shared/types";
export const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const options: RequestInit = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(
    `${import.meta.env.VITE_NOROFF_BASE}auth/login?_holidaze=true`,
    options,
  );
  const result = await response.json();
  if (!response.ok) {
    const errorMessage: string = result?.errors[0]?.message;
    throw new Error(errorMessage);
  }
  return result;
};
