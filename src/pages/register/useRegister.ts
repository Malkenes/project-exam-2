import { register as apiRegister } from "../../api/auth";
import { useState } from "react";
import { RegisterData } from "../../shared/types";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const reg = async (data: Partial<RegisterData>) => {
    setIsLoading(true);
    try {
      await apiRegister(data);
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
  return { reg, isError, isLoading };
};
