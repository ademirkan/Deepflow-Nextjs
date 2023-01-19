import { useEffect } from "react";
import { useTimerStateStore } from "../stores/useTimerStateStore";

export default function useTimerState() {
    const [
        isTimerRunning,
        setIsTimerRunning,
        isTimerStarted,
        setIsTimerStarted,
        resetRequested,
        setResetRequested,
    ] = useTimerStateStore((state) => [
        state.isTimerRunning,
        state.setIsTimerRunning,

        state.isTimerStarted,
        state.setIsTimerStarted,

        state.resetRequested,
        state.setResetRequested,
    ]);

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (isTimerRunning) {
                event.preventDefault();
                event.returnValue =
                    "You may lose your progress if you close this page while the timer is running.";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isTimerRunning]);

    return {
        isTimerRunning,
        isTimerStarted,
        setIsTimerRunning,
        setIsTimerStarted,
        resetRequested,
        setResetRequested,
    };
}
