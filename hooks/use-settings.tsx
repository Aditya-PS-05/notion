import { create } from "zustand";

type SetitingStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSettings = create<SetitingStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));