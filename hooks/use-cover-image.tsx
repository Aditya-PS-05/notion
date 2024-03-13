import { create } from "zustand";

type CoverImageStore = {
    url?: string,
    isOpen: boolean;
    OnOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
    url: undefined,
    isOpen: false,
    OnOpen: () => set({isOpen: true, url: undefined}),
    onClose: () => set({isOpen: false}),
    onReplace: (url: string) => set({isOpen: true, url})
}));