import { create } from "zustand";
import { createPersistSlice, UserSlice } from "./userSlice";
import { createModalSlice, ModalSlice } from "./modalSlice";
import { createSearchSlice, SearchSlice } from "./searchSlice";
import {
  createRegisterUserSlice,
  RegisterUserSlice,
} from "./registerUserSlice";
import { createUpdateUserSlice, UpdateUserSlice } from "./updateUserSlice";
import { createVenueSlice, VenueSlice } from "./venueSlice";
import { createMultiStepSlice, MultiStepSlice } from "./multiStepSlice";
import { createBookingSlice, BookingSlice } from "./useVenueStore";

export const useHolidazeStore = create<
  UserSlice &
    ModalSlice &
    SearchSlice &
    RegisterUserSlice &
    UpdateUserSlice &
    VenueSlice &
    MultiStepSlice &
    BookingSlice
>()((...a) => ({
  ...createPersistSlice(...a),
  ...createModalSlice(...a),
  ...createSearchSlice(...a),
  ...createRegisterUserSlice(...a),
  ...createUpdateUserSlice(...a),
  ...createVenueSlice(...a),
  ...createMultiStepSlice(...a),
  ...createBookingSlice(...a),
}));
