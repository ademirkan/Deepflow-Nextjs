import React from "react";
import { useState } from "react";

const DEFAULT_CONTEXT = {
    theme: "light",
    setThemeByName: (name: string) => {},
};

export const ThemeContext = React.createContext(DEFAULT_CONTEXT);

export function ThemeProvider({ children }: any) {
    const [theme, setTheme] = useState("light");

    const setThemeByName = (themeName: string) => {
        if (theme === themeName) {
            return;
        }
        setTheme(themeName);

        import(`../styles/themes/${themeName}`).then((module) => {
            const theme = module.default;
            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemeByName }}>
            {children}
        </ThemeContext.Provider>
    );
}
