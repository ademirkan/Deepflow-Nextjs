import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TimerStatusState {
    isTimerRunning: boolean;
    setIsTimerRunning: (isRunning: boolean) => void;
    isTimerStarted: boolean;
    setIsTimerStarted: (isStarted: boolean) => void;
}

export const useTimerStatusStore = create<TimerStatusState>()(
    devtools(
        persist(
            (set) => ({
                isTimerRunning: false,
                setIsTimerRunning: (isRunning) =>
                    set((state) => ({ isTimerRunning: isRunning })),
                isTimerStarted: false,
                setIsTimerStarted: (isStarted) =>
                    set((state) => ({ isTimerStarted: isStarted })),
            }),
            {
                name: "timer-status-storage",
            }
        )
    )
);
