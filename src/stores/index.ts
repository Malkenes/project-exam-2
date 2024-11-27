import { create } from "zustand";
import { createPersistSlice, UserSlice } from "./userSlice";

export const useHolidazeStore = create<UserSlice>()((...a) => ({
  ...createPersistSlice(...a),
}));
