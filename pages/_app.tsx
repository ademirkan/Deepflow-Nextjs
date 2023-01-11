import Script from "next/script";
import PageLayout from "../components/PageLayout";
import { SchedulerProvider } from "../contexts/SchedulerContext";
import SessionsProvider from "../contexts/SessionsContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import TimerStateProvider from "../contexts/TimerStateContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: any) {
    return (
        <>
            <Script src="https://kit.fontawesome.com/b3f869c97c.js"></Script>
            <ThemeProvider>
                <SettingsProvider>
                    <TimerStateProvider>
                        <SchedulerProvider>
                            <SessionsProvider>
                                <Component {...pageProps} />
                            </SessionsProvider>
                        </SchedulerProvider>
                    </TimerStateProvider>
                </SettingsProvider>
            </ThemeProvider>
        </>
    );
}
