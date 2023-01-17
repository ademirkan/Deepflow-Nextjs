import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
    activeThemeName: string;
    setActiveThemeName: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            (set) => ({
                activeThemeName: "light",
                setActiveThemeName: (themeName) => {
                    import(`../styles/themes/${themeName}`).then((module) => {
                        const theme = module.default;
                        Object.keys(theme).forEach((key) => {
                            const value = theme[key];
                            document.documentElement.style.setProperty(
                                key,
                                value
                            );
                        });
                    });
                    set((state) => ({
                        activeThemeName: themeName,
                    }));
                },
            }),
            {
                name: "theme-storage",
            }
        )
    )
);
