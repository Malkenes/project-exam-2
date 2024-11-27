import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignInUser } from "../shared/types";

type State = {
  userData: SignInUser;
};

type Actions = {
  setState: (fields: Partial<SignInUser>) => void;
  reset: () => void;
};

const initialState: State = {
  userData: {
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
  },
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setState: (fields) =>
        set((state) => ({ userData: { ...state.userData, ...fields } })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "user",
      partialize: (state) => {
        return state.userData.keepSignedIn ? { userData: state.userData } : {};
      },
      onRehydrateStorage: () => (state) => {
        if (state && !state.userData.keepSignedIn) {
          localStorage.removeItem("user");
        }
      },
    },
  ),
);
