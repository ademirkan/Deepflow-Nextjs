import { useEffect, useState } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export const useTheme: () => [string, (theme: string) => void] = () => {
    const [themeName, setThemeByName] = useThemeStore((state) => [
        state.themeName,
        state.setThemeByName,
    ]);

    useEffect(() => {
        import(`../styles/themes/${themeName}.json`).then((module) => {
            const theme = module.default;
            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        });
    }, [themeName]);

    return [themeName, setThemeByName];
};
