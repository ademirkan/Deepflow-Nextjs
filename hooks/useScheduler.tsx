import { useState } from "react";
import { useSchedulerStore } from "../stores/useSchedulerStore";
import { TimerSession } from "../Typescript/types/TimerSession";

interface Scheduler {
    currentSession: TimerSession;
    next: () => void;
    scheduleIndex: number;
    reset: () => void;
}

// returns current active scheduler
export const useScheduler: () => Scheduler = () => {
    const [activeSchedulerConfig, scheduleIndex, setScheduleIndex] =
        useSchedulerStore((state) => [
            state.activeSchedulerConfig,
            state.scheduleIndex,
            state.setScheduleIndex,
        ]);

    const { schedule } = activeSchedulerConfig;
    const next = () => {
        setScheduleIndex((scheduleIndex + 1) % schedule.length);
    };

    const reset = () => {
        console.log("yeet");
        setScheduleIndex(0);
    };

    const scheduler: Scheduler = {
        currentSession: schedule[scheduleIndex],
        next,
        scheduleIndex,
        reset,
    };

    return scheduler;
};
