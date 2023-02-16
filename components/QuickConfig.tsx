import { TimerType } from "../Typescript/enums/TimerType";
import { isEqual } from "lodash";
import TextButton from "./Buttons/TextButton";
import { useSchedulerStore } from "../stores/useSchedulerStore";
import { useAlarmStore } from "../stores/useAlarmStore";
import { useTimerStateStore } from "../stores/useTimerStateStore";
import { useState } from "react";
import PomodoroConfigModal from "./Modals/PomodoroConfigModal";

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
    // Stores
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

    // States
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Variables
    const activeConfigShorthand:
        | 15
        | 25
        | 50
        | 90
        | "custom_pomodoro"
        | "stopwatch" = (() => {
        if (activeSchedulerConfig.id === "POMODORO_SCHEDULER") {
            if (isEqual(activeSchedulerConfig.schedule, POMODORO_PRESETS[15])) {
                return 15;
            } else if (
                isEqual(activeSchedulerConfig.schedule, POMODORO_PRESETS[25])
            ) {
                return 25;
            } else if (
                isEqual(activeSchedulerConfig.schedule, POMODORO_PRESETS[50])
            ) {
                return 50;
            } else if (
                isEqual(activeSchedulerConfig.schedule, POMODORO_PRESETS[90])
            ) {
                return 90;
            } else {
                return "custom_pomodoro";
            }
        } else {
            return "stopwatch";
        }
    })();

    // Modal handlers
    const handleCustomPomodoroClick = () => {
        setIsModalOpen(true);
    };
    const handleModalRequestClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`${
                    isTimerRunning ? "animated-hidden" : "animated-visible"
                }`}
            >
                <span className="flex gap-1 justify-end">
                    <TextButton
                        isActive={
                            activeSchedulerConfig.id === "POMODORO_SCHEDULER"
                        }
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
                    <span className="flex justify-end">
                        <TextButton
                            isActive={activeConfigShorthand == 15}
                            onClick={() => {
                                updateSchedulerConfig("POMODORO_SCHEDULER", {
                                    name: "Pomodoro",
                                    schedule: POMODORO_PRESETS[15],
                                });
                            }}
                            className="px-[2px]"
                        >
                            15
                        </TextButton>
                        <TextButton
                            isActive={activeConfigShorthand == 25}
                            onClick={() => {
                                updateSchedulerConfig("POMODORO_SCHEDULER", {
                                    name: "Pomodoro",
                                    schedule: POMODORO_PRESETS[25],
                                });
                            }}
                            className="px-[2px]"
                        >
                            25
                        </TextButton>
                        <TextButton
                            isActive={activeConfigShorthand == 50}
                            onClick={() => {
                                updateSchedulerConfig("POMODORO_SCHEDULER", {
                                    name: "Pomodoro",
                                    schedule: POMODORO_PRESETS[50],
                                });
                            }}
                            className="px-[2px]"
                        >
                            50
                        </TextButton>
                        <TextButton
                            isActive={activeConfigShorthand == 90}
                            onClick={() => {
                                updateSchedulerConfig("POMODORO_SCHEDULER", {
                                    name: "Pomodoro",
                                    schedule: POMODORO_PRESETS[90],
                                });
                            }}
                            className="px-[2px]"
                        >
                            90
                        </TextButton>
                        <TextButton
                            isActive={
                                activeConfigShorthand == "custom_pomodoro"
                            }
                            onClick={handleCustomPomodoroClick}
                            icon={
                                <i className="fa-solid pl-[2px] pb-[1px] fa-screwdriver-wrench"></i>
                            }
                        />
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
            <PomodoroConfigModal
                isOpen={isModalOpen}
                onRequestClose={handleModalRequestClose}
            ></PomodoroConfigModal>
        </>
    );
}
