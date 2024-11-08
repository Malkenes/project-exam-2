import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SignInUser,
  Avatar,
  Banner,
  RegisterData,
  UpdateProfile,
} from "../shared/types";

type State = {
  userData: SignInUser;
  registerData: RegisterData;
};

type Actions = {
  setState: (fields: Partial<SignInUser>) => void;
  setRegisterState: (fields: Partial<RegisterData>) => void;
  setUserData: (userData: SignInUser) => void;
  updateUserData: (state: SignInUser) => void;
  setKeepSignedIn: (isEnabled: boolean) => void;
  setAvatarState: (fields: Partial<Avatar>) => void;
  setBannerState: (fields: Partial<Banner>) => void;
  getRegisterValues: () => Partial<RegisterData>;
  getUpdateValues: () => Partial<UpdateProfile>;
  reset: () => void;
  getValues: () => void;
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
  registerData: {
    name: "",
    email: "",
    bio: "",
    password: "",
    avatar: {
      url: "",
      alt: "",
    },
    banner: {
      url: "",
      alt: "",
    },
    venueManager: false,
  },
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserData: (state) =>
        set(() => ({
          userData: state,
        })),
      updateUserData: (state) =>
        set(() => ({
          userData: Object.fromEntries(
            Object.entries(state).map(([key, value]) => [key, value ?? ""]),
          ) as SignInUser,
        })),
      getValues: () => get(),
      setState: (fields) =>
        set((state) => ({ userData: { ...state.userData, ...fields } })),
      setRegisterState: (fields) =>
        set((state) => ({
          registerData: { ...state.registerData, ...fields },
        })),
      setKeepSignedIn: (isEnabled) =>
        set((state) => ({
          userData: { ...state.userData, keepSignedIn: isEnabled },
        })),
      setAvatarState: (fields) =>
        set((state) => ({
          userData: {
            ...state.userData,
            avatar: { ...state.userData.avatar, ...fields },
          },
        })),
      setBannerState: (fields) =>
        set((state) => ({
          userData: {
            ...state.userData,
            banner: { ...state.userData.banner, ...fields },
          },
        })),
      reset: () => {
        set(initialState);
      },
      getRegisterValues: () => {
        const { registerData } = get();
        const result: Partial<RegisterData> = { ...registerData };

        if (!registerData.avatar.url) {
          delete result.avatar;
        }
        if (!registerData.banner.url) {
          delete result.banner;
        }
        return result;
      },
      getUpdateValues: () => {
        const { userData } = get();
        const { accessToken, name, avatar, banner, venueManager, bio } =
          userData;
        const result = { accessToken, name, avatar, banner, venueManager, bio };

        return result;
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
