import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
    theme: string;
    setThemeByName: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            (set) => ({
                theme: "9009",
                setThemeByName: (themeName) => {
                    set((state) => ({
                        theme: themeName,
                    }));
                },
            }),
            {
                name: "theme-storage",
            }
        )
    )
);
