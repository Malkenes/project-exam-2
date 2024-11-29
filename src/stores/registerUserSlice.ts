import { StateCreator } from "zustand";
import { Media } from "../shared/types";

export interface RegisterUserSlice {
  registerUser: {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
  };
  setRegisterUserState: (
    fields: Partial<RegisterUserSlice["registerUser"]>,
  ) => void;
}

export const createRegisterUserSlice: StateCreator<
  RegisterUserSlice,
  [],
  [],
  RegisterUserSlice
> = (set) => ({
  registerUser: {
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: { url: "", alt: "" },
    banner: { url: "", alt: "" },
    venueManager: false,
  },
  setRegisterUserState: (fields) =>
    set((state) => ({ registerUser: { ...state.registerUser, ...fields } })),
});
