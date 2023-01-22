import { useEffect, useState } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export const useTheme: () => [string, (theme: string) => void] = () => {
    // required to fix hydration error -- needs initial theme name to be same on
    // client and server side render. Jank, but do not change!
    const [theme, setTheme] = useState("undefined");

    const [_themeName, setThemeByName] = useThemeStore((state) => [
        state.theme,
        state.setThemeByName,
    ]);

    useEffect(() => {
        import(`../styles/themes/${_themeName}.json`).then((module) => {
            const theme = module.default;
            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
            setTheme(_themeName);
        });
    }, [_themeName]);

    return [theme, setThemeByName];
};
