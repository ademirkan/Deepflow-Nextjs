import React, { useContext, useEffect, useState } from "react";
import useScheduler from "../hooks/useScheduler";
import { TimerType } from "../Typescript/enums/TimerType";
import { TimerSession } from "../Typescript/types/TimerSession";
import { SettingsContext } from "./SettingsContext";

const DEFAULT_CURRENT_SESSION: TimerSession = {
    targetDuration: new Date(),
    timerType: TimerType.countdown,
    isBreak: false,
};
export const SchedulerContext = React.createContext({
    currentSession: DEFAULT_CURRENT_SESSION,
    next: () => {},
    scheduleIndex: 0,
    resetSchedule: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const SchedulerProvider: React.FC<Props> = ({ children }) => {
    const { schedulerSettings } = useContext(SettingsContext);
    const [schedule, setSchedule] = useState(
        schedulerSettings.activeSchedulerConfig.schedule
    );
    const [scheduleIndex, setScheduleIndex] = useState(0);
    const [scheduler, setScheduler] = useScheduler(schedule, 0);

    const next = () => {
        scheduler.next();
        setScheduleIndex((prev) => (prev + 1) % schedule.length);
    };

    useEffect(() => {
        setSchedule(schedulerSettings.activeSchedulerConfig.schedule);
    }, [schedulerSettings.activeSchedulerConfig]);

    const resetSchedule = () => {
        setScheduleIndex(0);
        setScheduler(schedule, 0);
    };

    return (
        <SchedulerContext.Provider
            value={{
                currentSession: scheduler.currentSession,
                next,
                scheduleIndex,
                resetSchedule,
            }}
        >
            {children}
        </SchedulerContext.Provider>
    );
};
