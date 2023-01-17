import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TimerType } from "../Typescript/enums/TimerType";
import { ISchedulerConfig } from "../Typescript/interfaces/ISchedulerConfig";
import { TimerSession } from "../Typescript/types/TimerSession";

interface SchedulerConfigState {
    // Scheduler Config CRUD Operations
    allSchedulerConfigs: ISchedulerConfig[];
    getSchedulerConfigById: (id: string) => ISchedulerConfig | undefined;
    updateSchedulerConfig: (
        id: string,
        config: Omit<ISchedulerConfig, "id">
    ) => boolean;
    deleteSchedulerConfig: (id: string) => boolean;
    createSchedulerConfig: (config: Omit<ISchedulerConfig, "id">) => boolean;

    // // // Active Scheduler Config
    activeSchedulerConfig: ISchedulerConfig;
    setActiveSchedulerConfigById: (id: string) => boolean;
}

export const useSchedulerConfigStore = create<SchedulerConfigState>()(
    devtools(
        persist(
            (set, get) => ({
                allSchedulerConfigs: [
                    {
                        id: "POMODORO_SCHEDULER",
                        name: "Pomodoro",
                        schedule: [
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
                    },
                    {
                        id: "STOPWATCH_SCHEDULER",
                        name: "Stopwatch",
                        schedule: [
                            {
                                targetDuration: 5 * 60 * 1000,
                                timerType: TimerType.stopwatch,
                                isBreak: false,
                            },
                            {
                                targetDuration: 0,
                                timerType: TimerType.stopwatch,
                                isBreak: true,
                            },
                        ],
                    },
                ],
                getSchedulerConfigById: (id: string) => {
                    return get().allSchedulerConfigs.find(
                        (config: ISchedulerConfig) => config.id === id
                    );
                },
                updateSchedulerConfig: (
                    id: string,
                    config: Omit<ISchedulerConfig, "id">
                ) => {
                    let newSchedulerConfigs = [...get().allSchedulerConfigs];
                    let indexOfConfig = get().allSchedulerConfigs.findIndex(
                        (config: ISchedulerConfig) => config.id === id
                    );

                    if (indexOfConfig < 0) {
                        return false;
                    }

                    newSchedulerConfigs[indexOfConfig] = { id: id, ...config };
                    set((state) => ({
                        allSchedulerConfigs: newSchedulerConfigs,
                    }));

                    if (id === get().activeSchedulerConfig.id) {
                        set((state) => ({
                            activeSchedulerConfig: { id: id, ...config },
                        }));
                    }
                    return true;
                },
                deleteSchedulerConfig: (id: string) => {
                    // prevent pomodoro, stopwatch deletion
                    if (
                        id === "POMODORO_SCHEDULER" ||
                        id === "STOPWATCH_SCHEDULER"
                    ) {
                        return false;
                    }

                    let newSchedulerConfigs = get().allSchedulerConfigs.filter(
                        (config: ISchedulerConfig) => config.id != id
                    );
                    if (
                        newSchedulerConfigs.length ==
                        get().allSchedulerConfigs.length
                    ) {
                        return false;
                    }

                    set((state) => ({
                        allSchedulerConfigs: newSchedulerConfigs,
                    }));

                    if (id === get().activeSchedulerConfig.id) {
                        set((state) => ({
                            activeSchedulerConfig:
                                state.getSchedulerConfigById(
                                    "POMODORO_SCHEDULER"
                                ),
                        }));
                    }
                    return true;
                },
                createSchedulerConfig: (
                    config: Omit<ISchedulerConfig, "id">
                ) => {
                    let newSchedulerConfigs = [...get().allSchedulerConfigs];
                    const newConfig = { id: new Date().toString(), ...config };
                    newSchedulerConfigs.push(newConfig);

                    set((state) => ({
                        allSchedulerConfigs: newSchedulerConfigs,
                    }));
                    return true;
                },
                activeSchedulerConfig: {
                    id: "POMODORO_SCHEDULER",
                    name: "Pomodoro",
                    schedule: [
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
                },
                setActiveSchedulerConfigById: (id: string) => {
                    const config = get().getSchedulerConfigById(id);
                    if (config) {
                        set((state) => ({ activeSchedulerConfig: config }));
                        return true;
                    }
                    return false;
                },
            }),
            {
                name: "scheduler-storage",
            }
        )
    )
);
