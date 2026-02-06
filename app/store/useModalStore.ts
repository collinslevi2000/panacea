// src/store/useModalStore.ts
import { create } from "zustand";

export type ModalView =
"default"
  | "applicantView"| "addJob"

interface ModalState {
  isOpen: boolean;
  view: ModalView;
  openModal: (view?: ModalView) => void;
  closeModal: () => void;
  setView: (view: ModalView) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  view: "default",

  openModal: (view = "default") => {
    set({ isOpen: true, view });
  },

  closeModal: () => {
    set({ isOpen: false, view: "default" });
  },

  setView: (view) => {
    set({ view });
  },
}));
