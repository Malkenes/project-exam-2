import { create } from "zustand";
import { BaseUser, Booking, Venue } from "../shared/types";

interface State extends BaseUser {
  venues?: Venue[];
  bookings?: Booking[];
  _count: {
    venues: number;
    bookings: number;
  };
}

type Actions = {
  setState: (fields: Partial<State>) => void;
};

export const useProfileStore = create<State & Actions>()((set) => ({
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
  venueManager: false,
  _count: {
    venues: 0,
    bookings: 0,
  },
  setState: (fields) => set((state) => ({ ...state, ...fields })),
}));
