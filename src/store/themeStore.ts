import { create } from "zustand";

interface ThemeState {
  mode: "light" | "dark";
  fontScale: number;
  toggleTheme: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "light",
  fontScale: 1,
  toggleTheme: () => set({ mode: get().mode === "light" ? "dark" : "light" }),
  increaseFont: () =>
    set((state) => ({
      fontScale:
        state.fontScale < 1.5 ? state.fontScale + 0.1 : state.fontScale,
    })),
  decreaseFont: () =>
    set((state) => ({
      fontScale:
        state.fontScale > 0.8 ? state.fontScale - 0.1 : state.fontScale,
    })),
  resetFont: () => set({ fontScale: 1 }),
}));
