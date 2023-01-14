import { useContext, useEffect, useState } from "react";
import { SchedulerContext } from "../contexts/SchedulerContext";
import { SettingsContext } from "../contexts/SettingsContext";
import TextButton from "./Buttons/TextButton";

export const SchedulerProgress = (props: any) => {
    const { schedulerSettings } = useContext(SettingsContext);
    const { activeSchedulerConfig } = schedulerSettings;
    const { scheduleIndex, resetSchedule } = useContext(SchedulerContext);
    const [schedule, setSchedule] = useState(activeSchedulerConfig.schedule);

    useEffect(() => {
        setSchedule(activeSchedulerConfig.schedule);
    }, [activeSchedulerConfig]);

    // number of dots = len(scheduler)
    const circleStyle = "h-3 w-3 mx-0.5";
    const ICON_RADIUS = "22px";

    return (
        <div className="relative flex flex-row justify-center items-center w-72">
            <div
                className={`flex flex-row justify-center items-center relative left-[${ICON_RADIUS}]`}
            >
                {[...schedule]
                    .splice(0, scheduleIndex)
                    .filter((session) => {
                        return !session.isBreak;
                    })
                    .map((_, i) => {
                        console.log(i);
                        return (
                            <svg
                                key={i}
                                className={circleStyle}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="50"
                                    fill={"var(--main-color"}
                                />
                            </svg>
                        );
                    })}
                {[...schedule]
                    .splice(scheduleIndex, schedule.length)
                    .filter((session) => {
                        return !session.isBreak;
                    })
                    .map((_, i) => {
                        return (
                            <svg
                                key={i}
                                className={circleStyle}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="50"
                                    fill={"var(--sub-color)"}
                                />
                            </svg>
                        );
                    })}
            </div>
            <div className={`flex items-center relative left-[${ICON_RADIUS}]`}>
                <TextButton
                    size="lg"
                    icon={
                        <div className="p-3">
                            <i className="fa-solid fa-rotate-right"></i>
                        </div>
                    }
                    onClick={resetSchedule}
                ></TextButton>
            </div>
        </div>
    );
};
