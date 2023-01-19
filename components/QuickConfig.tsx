import { TimerType } from "../Typescript/enums/TimerType";
import { isEqual } from "lodash";
import TextButton from "./Buttons/TextButton";
import { useSchedulerStore } from "../stores/useSchedulerStore";
import { useAlarmStore } from "../stores/useAlarmStore";
import { useTimerStateStore } from "../stores/useTimerStateStore";

const POMODORO_PRESETS = {
    15: [
        {
            targetDuration: 15 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 3 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 15 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 3 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 15 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 3 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 15 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 10 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
    25: [
        {
            targetDuration: 25 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 5 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 25 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 5 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 25 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 5 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 25 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 15 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
    50: [
        {
            targetDuration: 50 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 10 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 50 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 10 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 50 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 10 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 50 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 30 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],

    90: [
        {
            targetDuration: 90 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 25 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
        {
            targetDuration: 90 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: false,
        },
        {
            targetDuration: 60 * 60 * 1000,
            timerType: TimerType.countdown,
            isBreak: true,
        },
    ],
};

export function QuickConfig() {
    const [
        activeSchedulerConfig,
        setActiveSchedulerConfigById,
        updateSchedulerConfig,
    ] = useSchedulerStore((state) => [
        state.activeSchedulerConfig,
        state.setActiveSchedulerConfigById,
        state.updateSchedulerConfig,
    ]);

    const [isAlarmEnabled, setIsAlarmEnabled] = useAlarmStore((state) => [
        state.isAlarmEnabled,
        state.setIsAlarmEnabled,
    ]);

    const [isTimerRunning, isTimerStarted] = useTimerStateStore((state) => [
        state.isTimerRunning,
        state.isTimerStarted,
    ]);

    return (
        <div
            className={`${
                isTimerRunning ? "animated-hidden" : "animated-visible"
            }`}
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
                    isActive={isAlarmEnabled}
                    onClick={() => {
                        setIsAlarmEnabled(!isAlarmEnabled);
                    }}
                >
                    alarm
                </TextButton>
            </span>
        </div>
    );
}
