import { create } from "zustand";

type State = {
  step: number;
};

type Action = {
  setPrev: () => void;
  setNext: () => void;
};
export const useMultiStepStore = create<State & Action>()((set) => ({
  step: 1,
  setPrev: () => set((state) => ({ step: state.step - 1 })),
  setNext: () => set((state) => ({ step: state.step + 1 })),
}));
