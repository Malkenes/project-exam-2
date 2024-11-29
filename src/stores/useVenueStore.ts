import { LatLngLiteral } from "leaflet";
import { create, StateCreator } from "zustand";
import { Media } from "../shared/types";
type State = {
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
  position: LatLngLiteral;
  loc: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
  };
};
type Actions = {
  setPosition: (position: { lat: number; lng: number }) => void;
  updateLoc: (fields: { [key: string]: string }) => void;
};

export const useVenueStore = create<State & Actions>()((set) => ({
  name: "",
  description: "",
  Media: [],
  price: 1,
  maxGuests: 1,
  rating: 1,
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  position: {
    lat: 0,
    lng: 0,
  },
  loc: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
  },
  setPosition: (pos) => set(() => ({ position: pos })),
  updateLoc: (fields) =>
    set((state) => {
      const commonFields = Object.keys(state.loc).reduce(
        (acc, key) => {
          if (key in fields) {
            acc[key as keyof State["loc"]] = fields[key];
          } else {
            acc[key as keyof State["loc"]] = "";
          }
          return acc;
        },
        {} as Partial<State["loc"]>,
      );

      if (fields.road && fields.house_number) {
        commonFields.address = `${fields.road} ${fields.house_number}`;
      }

      if (fields.postcode) {
        commonFields.zip = fields.postcode;
      }

      return { loc: { ...state.loc, ...commonFields } };
    }),
}));

export interface BookingSlice {
  booking: {
    venueId: string;
    name: string;
    dateFrom: Date;
    dateTo: Date;
    guests: number;
  };
  setBookingState: (fields: Partial<BookingSlice["booking"]>) => void;
}

export const createBookingSlice: StateCreator<
  BookingSlice,
  [],
  [],
  BookingSlice
> = (set) => ({
  booking: {
    venueId: "",
    name: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 1,
  },
  setBookingState: (fields) =>
    set((state) => ({ booking: { ...state.booking, ...fields } })),
});
