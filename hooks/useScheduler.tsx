import { useEffect, useState } from "react";
import { TimerSession } from "../Typescript/types/TimerSession";

/**
 * returns next, currentSession
 * Needs to update everytime next() is called
 */
export default function useScheduler(
    schedule: TimerSession[],
    startIndex: number
) {
    const [activeSchedule, setActiveSchedule] = useState(schedule);
    const [scheduleIndex, setScheduleIndex] = useState(
        startIndex % schedule.length
    );

    useEffect(() => {
        setScheduleIndex(startIndex % schedule.length);
    }, [startIndex, schedule]);

    const next = () => {
        let newScheduleIndex;

        setScheduleIndex((prevScheduleIndex) => {
            newScheduleIndex =
                prevScheduleIndex < schedule.length - 1
                    ? prevScheduleIndex + 1
                    : 0;
            return newScheduleIndex;
        });

        return newScheduleIndex;
    };

    const currentSession = schedule[scheduleIndex];
    const scheduler = { currentSession, next };
    const setScheduler = (schedule: TimerSession[], startIndex: number) => {
        setActiveSchedule(schedule);
        setScheduleIndex(startIndex % schedule.length);
    };

    return [scheduler, setScheduler];
}
