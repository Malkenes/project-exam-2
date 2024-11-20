import { LatLngLiteral } from "leaflet";
import { create, StateCreator } from "zustand";
import { BaseVenue, Media, Meta, Venue } from "../shared/types";
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

interface VenueSlice {
  venue: BaseVenue;
  setVenueState: (fields: Partial<Venue>) => void;
  setMetaState: (fields: Meta) => void;
  setMediaState: (fields: Media) => void;
}

const initialState: BaseVenue = {
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
};
const createVenueSlice: StateCreator<VenueSlice, [], [], VenueSlice> = (
  set,
) => ({
  venue: initialState,
  setVenueState: (fields) =>
    set((state) => ({ venue: { ...state.venue, ...fields } })),
  setMetaState: (fields) =>
    set((state) => ({
      venue: {
        ...state.venue,
        meta: { ...state.venue.meta, ...fields },
      },
    })),
  setMediaState: (fields) =>
    set((state) => ({
      venue: {
        ...state.venue,
        media: state.venue.media ? [...state.venue.media, fields] : [fields],
      },
    })),
});

interface BookingSlice {
  booking: {
    venueId: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
  };
  setGuests: (amount: number) => void;
}

const createBookingSlice: StateCreator<BookingSlice, [], [], BookingSlice> = (
  set,
) => ({
  booking: {
    venueId: "",
    dateFrom: "",
    dateTo: "",
    guests: 0,
  },
  setGuests: (amount) =>
    set((state) => ({ booking: { ...state.booking, guests: amount } })),
});

export const useBoundStore = create<VenueSlice & BookingSlice>()((...a) => ({
  ...createVenueSlice(...a),
  ...createBookingSlice(...a),
}));
