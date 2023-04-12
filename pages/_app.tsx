// pages/_app.tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "../stores/useThemeStore";
import "../styles/globals.css";
import StarsBackground from "../components/StarsBackground";
import Script from "next/script";

function App({ Component, pageProps }: any) {
    const specialThemeName = useThemeStore((state) => state.specialThemeName);
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsTransitioning(true);
        };
        const handleRouteChangeComplete = () => {
            setIsTransitioning(false);
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [router.events]);

    return (
        <>
            <Script src="https://kit.fontawesome.com/b3f869c97c.js"></Script>

            <Component
                {...pageProps}
                className={isTransitioning ? "pageTransition" : ""}
            />
            {specialThemeName === "nasa" && <StarsBackground />}
        </>
    );
}

export default App;
