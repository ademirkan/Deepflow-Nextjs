import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import _special_themes from "../styles/themes/_special_themes.json";

interface ThemeState {
    themeName: string;
    setThemeByName: (theme: string) => void;

    // Special themes are themes that require additional logic to be applied in _app.tsx.
    // If a theme is special, change both the themeName and specialThemeName.
    specialThemeName?: string;
}

export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            (set) => ({
                themeName: "9009",
                setThemeByName: (themeName) => {
                    if (_special_themes.includes(themeName)) {
                        set((state) => ({
                            themeName: themeName,
                            specialThemeName: themeName,
                        }));
                    } else {
                        set((state) => ({
                            themeName: themeName,
                            specialThemeName: undefined,
                        }));
                    }
                },
            }),
            {
                name: "theme-storage",
            }
        )
    )
);
