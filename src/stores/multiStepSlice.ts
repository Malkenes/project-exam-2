import { StateCreator } from "zustand";

export interface MultiStepSlice {
  step: number;
  setPrev: () => void;
  setNext: () => void;
  resetSteps: () => void;
}

export const createMultiStepSlice: StateCreator<
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
