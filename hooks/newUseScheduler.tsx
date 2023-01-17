import { useState } from "react";
import { useSchedulerConfigStore } from "../store/useSchedulerConfigStore";
import { TimerSession } from "../Typescript/types/TimerSession";

interface Scheduler {
    currentSession: TimerSession;
    next: () => void;
    scheduleIndex: number;
    reset: () => void;
}

// returns current active scheduler
export const useScheduler: () => Scheduler = () => {
    const activeSchedulerConfig = useSchedulerConfigStore(
        (state) => state.activeSchedulerConfig
    );

    const { schedule } = activeSchedulerConfig;
    const [scheduleIndex, setScheduleIndex] = useState(0);
    const next = () => {
        setScheduleIndex((prevIndex) => (prevIndex + 1) % schedule.length);
    };
    const reset = () => {
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
