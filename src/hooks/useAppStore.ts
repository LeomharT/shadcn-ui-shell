import { create } from 'zustand';

type StoreState = {
  expanded: boolean;
  minimal: boolean;
  toggleSiderbar: (value?: boolean) => void;
  toggleMinimal: (value?: boolean) => void;
};

export const useAppStore = create<StoreState>((set) => ({
  expanded: false,
  minimal: false,
  toggleSiderbar: (value?: boolean) => set((prev) => ({ expanded: value || !prev.expanded })),
  toggleMinimal: (value?: boolean) => set((prev) => ({ minimal: value || !prev.minimal })),
}));
