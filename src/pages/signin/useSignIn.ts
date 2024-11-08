import { signIn as apiSignIn } from "../../api/auth/index";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

export const useSignIn = () => {
  const setUserData = useUserStore((state) => state.setState);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const signIn = async ({
    email,
    password,
    keepSignedIn,
  }: {
    email: string;
    password: string;
    keepSignedIn: boolean;
  }) => {
    setIsLoading(true);
    try {
      const response = await apiSignIn(email, password);
      setUserData(response.data);
      setUserData({ keepSignedIn });
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
