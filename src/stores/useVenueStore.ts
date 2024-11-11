import { LatLngLiteral } from "leaflet";
import { create } from "zustand";
type State = {
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
