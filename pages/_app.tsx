import Script from "next/script";
import { useEffect } from "react";
import PageLayout from "../components/PageLayout";

import { useThemeStore } from "../stores/useThemeStore";
import "../styles/globals.css";

export default function App({ Component, pageProps }: any) {
    const activeThemeName = useThemeStore((state) => state.theme);
    console.log(activeThemeName);
    useEffect(() => {
        import(`../styles/themes/${activeThemeName}`).then((module) => {
            const theme = module.default;
            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        });
    }, []);
    return (
        <>
            <Script src="https://kit.fontawesome.com/b3f869c97c.js"></Script>

            <Component {...pageProps} />
        </>
    );
}
