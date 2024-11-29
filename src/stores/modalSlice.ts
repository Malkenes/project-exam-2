import { StateCreator } from "zustand";

export interface ModalSlice {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (
  set,
) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
});
