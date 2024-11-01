import { signIn as apiSignIn } from "../../api/auth/index";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

export const useSignIn = () => {
  const setUserData = useUserStore((state) => state.setUserData);
  const setKeepSignedIn = useUserStore((state) => state.setKeepSignedIn);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const signIn = async ({
    email,
    password,
    keepLoggedIn,
  }: {
    email: string;
    password: string;
    keepLoggedIn: boolean;
  }) => {
    setIsLoading(true);
    try {
      const data = await apiSignIn(email, password);
      setUserData(data.data);
      setKeepSignedIn(keepLoggedIn);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { signIn, isError, isLoading };
};
