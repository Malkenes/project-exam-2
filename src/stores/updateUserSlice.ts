import { StateCreator } from "zustand";
import { Media } from "../shared/types";

export interface UpdateUserSlice {
  updateUser: {
    bio: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
  };
  setUpdateUserState: (fields: Partial<UpdateUserSlice["updateUser"]>) => void;
}

export const createUpdateUserSlice: StateCreator<
  UpdateUserSlice,
  [],
  [],
  UpdateUserSlice
> = (set) => ({
  updateUser: {
    bio: "",
    avatar: { url: "", alt: "" },
    banner: { url: "", alt: "" },
    venueManager: false,
  },
  setUpdateUserState: (fields) =>
    set((state) => ({ updateUser: { ...state.updateUser, ...fields } })),
});
