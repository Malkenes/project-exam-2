import { StateCreator } from "zustand";
import { Media } from "../shared/types";

export interface VenueSlice {
  venue: {
    name: string;
    description: string;
    media?: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location?: {
      address?: string;
      city?: string;
      zip?: string;
      country?: string;
      continent?: string;
      lat?: number;
      lng?: number;
    };
  };
  setVenueState: (fields: Partial<VenueSlice["venue"]>) => void;
}

export const createVenueSlice: StateCreator<VenueSlice, [], [], VenueSlice> = (
  set,
) => ({
  venue: {
    name: "",
    description: "",
    media: [],
    price: 20,
    maxGuests: 1,
    rating: 3,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {},
  },
  setVenueState: (fields) =>
    set((state) => ({ venue: { ...state.venue, ...fields } })),
});
