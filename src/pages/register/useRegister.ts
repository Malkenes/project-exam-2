import { register as apiRegister } from "../../api/auth";
import { useState } from "react";
import { useMultiStepStore } from "../../stores/useMultiStepStore";
import { RegisterData, UpdateProfile } from "../../shared/types";
import { updateProfile } from "../../api/update";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";

export const useRegister = () => {
  const setUserData = useUserStore((state) => state.setState);
  const openModal = useModalStore((state) => state.openModal);
  const resetSteps = useMultiStepStore((state) => state.reset);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const reg = async (data: Partial<RegisterData>) => {
    setIsLoading(true);
    try {
      await apiRegister(data);
      resetSteps();
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
  const update = async (data: Partial<UpdateProfile>) => {
    setIsLoading(true);
    try {
      const result = await updateProfile(data);
      setUserData(result.data);
      openModal();
      resetSteps();
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
  return { reg, update, isError, isLoading };
};
