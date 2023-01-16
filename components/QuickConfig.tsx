import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { TimerType } from "../Typescript/enums/TimerType";
import { isEqual } from "lodash";
import TextButton from "./Buttons/TextButton";
import { TimerStateContext } from "../contexts/TimerStateContext";

const POMODORO_PRESETS = {
    15: [
        {
            targetDuration: new Date(15 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(3 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(15 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(3 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(15 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(3 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(15 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(10 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
    25: [
        {
            targetDuration: new Date(25 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(5 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(25 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(5 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(25 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(5 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(25 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(15 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
    50: [
        {
            targetDuration: new Date(50 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(10 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(50 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(10 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(50 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(10 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(50 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(30 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],

    90: [
        {
            targetDuration: new Date(90 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(25 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: new Date(90 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: new Date(60 * 60 * 1000),
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
};

export function QuickConfig() {
    const { schedulerSettings, alarmSetting, setAlarmSetting } =
        useContext(SettingsContext);

    const {
        activeSchedulerConfig,
        setActiveSchedulerConfigById,
        updateSchedulerConfig,
    } = schedulerSettings;

    const { isRunning, isStarted } = useContext(TimerStateContext);

    return (
        <div
            className={`${isRunning ? "animated-hidden" : "animated-visible"}`}
        >
            <span className="flex gap-1 justify-end">
                <TextButton
                    isActive={activeSchedulerConfig.id === "POMODORO_SCHEDULER"}
                    onClick={() => {
                        setActiveSchedulerConfigById("POMODORO_SCHEDULER");
                    }}
                >
                    pomodoro
                </TextButton>
                <TextButton
                    isActive={
                        activeSchedulerConfig.id === "STOPWATCH_SCHEDULER"
                    }
                    onClick={() => {
                        setActiveSchedulerConfigById("STOPWATCH_SCHEDULER");
                    }}
                >
                    stopwatch
                </TextButton>
            </span>
            {activeSchedulerConfig.id === "POMODORO_SCHEDULER" && (
                <span className="flex gap-1 justify-end">
                    <TextButton
                        isActive={isEqual(
                            activeSchedulerConfig.schedule,
                            POMODORO_PRESETS[15]
                        )}
                        onClick={() => {
                            updateSchedulerConfig("POMODORO_SCHEDULER", {
                                name: "Pomodoro",
                                schedule: POMODORO_PRESETS[15],
                            });
                        }}
                    >
                        15
                    </TextButton>
                    <TextButton
                        isActive={isEqual(
                            activeSchedulerConfig.schedule,
                            POMODORO_PRESETS[25]
                        )}
                        onClick={() => {
                            updateSchedulerConfig("POMODORO_SCHEDULER", {
                                name: "Pomodoro",
                                schedule: POMODORO_PRESETS[25],
                            });
                        }}
                    >
                        25
                    </TextButton>
                    <TextButton
                        isActive={isEqual(
                            activeSchedulerConfig.schedule,
                            POMODORO_PRESETS[50]
                        )}
                        onClick={() => {
                            updateSchedulerConfig("POMODORO_SCHEDULER", {
                                name: "Pomodoro",
                                schedule: POMODORO_PRESETS[50],
                            });
                        }}
                    >
                        50
                    </TextButton>
                    <TextButton
                        isActive={isEqual(
                            activeSchedulerConfig.schedule,
                            POMODORO_PRESETS[90]
                        )}
                        onClick={() => {
                            updateSchedulerConfig("POMODORO_SCHEDULER", {
                                name: "Pomodoro",
                                schedule: POMODORO_PRESETS[90],
                            });
                        }}
                    >
                        90
                    </TextButton>
                </span>
            )}
            <span className="flex gap-2 justify-end">
                <TextButton
                    isActive={alarmSetting}
                    onClick={() => {
                        setAlarmSetting(!alarmSetting);
                    }}
                >
                    alarm
                </TextButton>
            </span>
        </div>
    );
}
