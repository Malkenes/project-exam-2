/*
import { create } from "zustand";
import { RegisterData, Avatar, Banner } from "../shared/types";

type Action = {
  setState: (fields: Partial<RegisterData>) => void;
  setAvatarState: (fields: Partial<Avatar>) => void;
  setBannerState: (fields: Partial<Banner>) => void;
  getValues: () => RegisterData;
  getRegisterValues: () => Partial<RegisterData>;
};
export const useRegisterStore = create<RegisterData & Action>()((set, get) => ({
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
  setState: (fields) => set((state) => ({ ...state, ...fields })),
  setAvatarState: (fields) =>
    set((state) => ({ ...state, avatar: { ...state.avatar, ...fields } })),
  setBannerState: (fields) =>
    set((state) => ({ ...state, banner: { ...state.banner, ...fields } })),
  getValues: () => get(),
  getRegisterValues: () => {
    const { ...state } = get();
    const result: Partial<RegisterData> = { ...state };
    if (!state.avatar.url) delete result.avatar;
    if (!state.banner.url) delete result.banner;
    return result;
  },
}));
*/
