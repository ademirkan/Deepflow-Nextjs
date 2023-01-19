import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { useEffect } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export default function Document() {
    return (
        <Html>
            <Head>
                {/* FONTS */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@200;300;400&family=Varela+Round&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500&family=Oxygen:wght@300;400;700&family=Poppins:wght@300;500;600&family=Roboto+Mono:wght@400;500&family=Ubuntu:ital,wght@0,300;0,400;1,400&family=Varela+Round&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
