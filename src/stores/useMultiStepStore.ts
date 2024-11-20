import { create, StateCreator } from "zustand";
import { Media } from "../shared/types";

type State = {
  step: number;
  updateUser: {
    bio: string;
    avatar: { url: string; alt: string };
  };
};

type Action = {
  setPrev: () => void;
  setNext: () => void;
  reset: () => void;
};
export const useMultiStepStore = create<State & Action>()((set) => ({
  step: 1,
  updateUser: { avatar: { url: "", alt: "" }, bio: "xd" },
  setPrev: () => set((state) => ({ step: state.step - 1 })),
  setNext: () => set((state) => ({ step: state.step + 1 })),
  reset: () => set((state) => ({ step: (state.step = 1) })),
}));

interface MultiStepSlice {
  step: number;
  setPrev: () => void;
  setNext: () => void;
  resetSteps: () => void;
}
const createMultiStepSlice: StateCreator<
  MultiStepSlice,
  [],
  [],
  MultiStepSlice
> = (set) => ({
  step: 1,
  setPrev: () => set((state) => ({ step: state.step - 1 })),
  setNext: () => set((state) => ({ step: state.step + 1 })),
  resetSteps: () => set((state) => ({ step: (state.step = 1) })),
});

interface UpdateUserSlice {
  updateUser: {
    bio: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
  };
  setUpdateUserState: (fields: Partial<UpdateUserSlice["updateUser"]>) => void;
}
const createUpdateUserSlice: StateCreator<
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

interface RegisterUserSlice {
  registerUser: {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
  };
  setRegisterUserState: (
    fields: Partial<RegisterUserSlice["registerUser"]>,
  ) => void;
}
const createRegisterUserSlice: StateCreator<
  RegisterUserSlice,
  [],
  [],
  RegisterUserSlice
> = (set) => ({
  registerUser: {
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: { url: "", alt: "" },
    banner: { url: "", alt: "" },
    venueManager: false,
  },
  setRegisterUserState: (fields) =>
    set((state) => ({ registerUser: { ...state.registerUser, ...fields } })),
});

interface VenueSlice {
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
const createVenueSlice: StateCreator<VenueSlice, [], [], VenueSlice> = (
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

export const useFormStore = create<
  MultiStepSlice & UpdateUserSlice & RegisterUserSlice & VenueSlice
>()((...a) => ({
  ...createMultiStepSlice(...a),
  ...createUpdateUserSlice(...a),
  ...createRegisterUserSlice(...a),
  ...createVenueSlice(...a),
}));
