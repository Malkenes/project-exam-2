import { signIn as apiSignIn } from "../../api/auth/index";
import { useState } from "react";
import { useHolidazeStore } from "../../stores";

export const useSignIn = () => {
  const setUserData = useHolidazeStore((state) => state.setUserState);
  const [isSuccessful, setIsSuccessful] = useState(false);
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
      setIsSuccessful(true);
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
  return { signIn, isError, isLoading, isSuccessful };
};
