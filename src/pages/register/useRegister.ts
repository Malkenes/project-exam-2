import { register as apiRegister } from "../../api/auth";
import {
  createBooking as apiBooking,
  deleteBooking as apiDeleteBooking,
} from "../../api/booking";
import {
  createVenue as apiCreateVenue,
  deleteVenue as apiDeleteVenue,
} from "../../api/venues";
import { useState } from "react";
import { useMultiStepStore } from "../../stores/useMultiStepStore";
import { BaseVenue, RegisterData, UpdateProfile } from "../../shared/types";
import { updateProfile as apiUpdateProfile } from "../../api/profile";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";

export const useRegister = () => {
  const accessToken = useUserStore((state) => state.userData.accessToken);
  const name = useUserStore((state) => state.userData.name);
  const setUserData = useUserStore((state) => state.setState);
  const openModal = useModalStore((state) => state.openModal);
  const resetSteps = useMultiStepStore((state) => state.reset);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const reg = async (data: Partial<RegisterData>) => {
    setIsLoading(true);
    try {
      await apiRegister(data);
      setIsSuccessful(true);
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
  const updateProfile = async (data: Partial<UpdateProfile>) => {
    setIsLoading(true);
    try {
      const result = await apiUpdateProfile(accessToken, name, data);
      setUserData(result.data);
      setIsSuccessful(true);
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

  const createBooking = async (data: {
    dateFrom: Date;
    dateTo: Date;
    guests: number;
    venueId: string;
  }) => {
    setIsLoading(true);
    try {
      await apiBooking(accessToken, data);
      openModal();
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
  const deleteBooking = async (id: string) => {
    setIsLoading(true);
    try {
      await apiDeleteBooking(accessToken, id);
      setIsDeleted(true);
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

  const createVenue = async (data: BaseVenue) => {
    setIsLoading(true);
    try {
      const result = await apiCreateVenue(accessToken, data);
      console.log(result);
      openModal();
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
  const deleteVenue = async (id: string) => {
    setIsLoading(true);
    try {
      await apiDeleteVenue(accessToken, id);
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
  return {
    reg,
    updateProfile,
    createBooking,
    deleteBooking,
    createVenue,
    deleteVenue,
    isError,
    isLoading,
    isDeleted,
    isSuccessful,
  };
};
