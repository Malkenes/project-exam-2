import { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Media } from "../shared/types";

export interface UserSlice {
  userData: {
    name: string;
    email: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
    bio: string;
    keepSignedIn: boolean;
    accessToken: string;
  };
  setUserState: (fields: Partial<UserSlice["userData"]>) => void;
  resetUser: () => void;
}

const initialUserData: UserSlice["userData"] = {
  name: "",
  email: "",
  bio: "",
  avatar: {
    url: "",
    alt: "",
  },
  banner: {
    url: "",
    alt: "",
  },
  accessToken: "",
  venueManager: false,
  keepSignedIn: false,
};

const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/persist", unknown]],
  [],
  UserSlice
> = (set) => ({
  userData: initialUserData,
  setUserState: (fields) =>
    set((state) => ({ userData: { ...state.userData, ...fields } })),
  resetUser: () => {
    set({ userData: initialUserData });
  },
});

const persistOptions: PersistOptions<UserSlice, unknown> = {
  name: "user",
  partialize: (state) => {
    return state.userData.keepSignedIn ? { userData: state.userData } : {};
  },
  onRehydrateStorage: () => (state) => {
    if (state && !state.userData.keepSignedIn) {
      localStorage.removeItem("user");
    }
  },
};

export const createPersistSlice = persist(createUserSlice, persistOptions);
