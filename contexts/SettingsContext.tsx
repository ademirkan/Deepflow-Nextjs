import React, { useEffect, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { TimerType } from "../Typescript/enums/TimerType";
import { ISchedulerConfig } from "../Typescript/interfaces/ISchedulerConfig";

//@ts-ignore
import defaultSound from "../public/sounds/gentle.mp3";

interface IAlarmSettings {
    alarmEnabled: boolean;
    // volume: number;
    alarmSound: Buffer;

    setAlarmEnabled: (bool: boolean) => void;
    // setVolume: (volume: number) => void;
    // setAlarmSoundByName: (soundName: string) => void;
}

interface ISchedulerSettings {
    // All configs
    schedulerConfigs: ISchedulerConfig[];

    // CRUD functions
    getSchedulerConfig: (id: string) => ISchedulerConfig;
    updateSchedulerConfig: (
        id: string,
        config: Omit<ISchedulerConfig, "id">
    ) => boolean;
    deleteSchedulerConfig: (id: string) => boolean;
    createSchedulerConfig: (config: Omit<ISchedulerConfig, "id">) => boolean;

    // Active Scheduler
    activeSchedulerConfig: ISchedulerConfig;
    setActiveSchedulerConfigById: (id: string) => boolean;
}
interface ISettingsContext {
    schedulerSettings: ISchedulerSettings;
    alarmSettings: IAlarmSettings;

    // refactor later -- TimerPreferences, etc
    overtimeSetting: boolean;
    setOvertimeSetting: (bool: boolean) => void;
    autostartSetting: boolean;
    setAutostartSetting: (bool: boolean) => void;
}

const DEFAULT_CONTEXT: ISettingsContext = {
    schedulerSettings: {
        schedulerConfigs: [
            {
                id: "",
                name: "",
                schedule: [
                    {
                        targetDuration: new Date(0),
                        timerType: TimerType.countdown,
                        isBreak: false,
                    },
                ],
            },
        ],
        getSchedulerConfig: (id: string) => {
            return {
                id: "",
                name: "",
                schedule: [
                    {
                        targetDuration: new Date(0),
                        timerType: TimerType.countdown,
                        isBreak: false,
                    },
                ],
            };
        },
        updateSchedulerConfig: (
            id: string,
            config: Omit<ISchedulerConfig, "id">
        ) => {
            return true;
        },
        deleteSchedulerConfig: (id: string) => {
            return true;
        },
        createSchedulerConfig: (config: Omit<ISchedulerConfig, "id">) => {
            return true;
        },
        activeSchedulerConfig: {
            id: "",
            name: "",
            schedule: [
                {
                    targetDuration: new Date(0),
                    timerType: TimerType.countdown,
                    isBreak: false,
                },
            ],
        },
        setActiveSchedulerConfig: (id: string) => true,
    },

    alarmSettings: {
        alarmEnabled: false,
        setAlarmEnabled: (bool: boolean) => {},

        // volume: 1.0,
        alarmSound: defaultSound,
        // setVolume: (volume: number) => {},
        // setAlarmSoundByName: (soundName: string) => {},
    },

    overtimeSetting: false,
    setOvertimeSetting: (bool: boolean) => {},
    autostartSetting: false,
    setAutostartSetting: (bool: boolean) => {},
};

export const SettingsContext = React.createContext(DEFAULT_CONTEXT);

interface Props {
    children: React.ReactNode;
}

const DEFAULT_LOCAL_STORAGE_SETTINGS = {
    schedulerConfigs: [
        {
            id: "POMODORO_SCHEDULER",
            name: "Pomodoro",
            schedule: [
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
        },
        {
            id: "STOPWATCH_SCHEDULER",
            name: "Stopwatch",
            schedule: [
                {
                    targetDuration: new Date(5 * 60 * 1000),
                    timerType: TimerType.stopwatch,
                    isBreak: false,
                },
                {
                    targetDuration: new Date(0),
                    timerType: TimerType.stopwatch,
                    isBreak: true,
                },
            ],
        },
    ],
    activeSchedulerConfig: {
        id: "POMODORO_SCHEDULER",
        name: "Pomodoro",
        schedule: [
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
    },
    alarmEnabled: false,
    alarmVolume: 1.0,
    alarmSound: defaultSound,
    overtimeSetting: false,
};

export const SettingsProvider: React.FC<Props> = ({ children }) => {
    // SCHEDULER CONFIGS
    const [schedulerConfigs, setSchedulerConfigs] = useLocalStorageState(
        "scheduler_configs",
        DEFAULT_LOCAL_STORAGE_SETTINGS.schedulerConfigs
    );
    const [activeSchedulerConfig, setActiveSchedulerConfig] =
        useLocalStorageState(
            "active_scheduler_config",
            DEFAULT_LOCAL_STORAGE_SETTINGS.activeSchedulerConfig
        );
    const getSchedulerConfig = (id: string) => {
        const config = schedulerConfigs.find(
            (config: ISchedulerConfig) => config.id === id
        );
        return config;
    };
    const updateSchedulerConfig = (
        id: string,
        config: Omit<ISchedulerConfig, "id">
    ) => {
        let newSchedulerConfigs = [...schedulerConfigs];
        let indexOfConfig = schedulerConfigs.findIndex(
            (config: ISchedulerConfig) => config.id === id
        );

        if (indexOfConfig < 0) {
            return false;
        }

        newSchedulerConfigs[indexOfConfig] = { id: id, ...config };
        setSchedulerConfigs(newSchedulerConfigs);

        if (id === activeSchedulerConfig.id) {
            setActiveSchedulerConfig({ id: id, ...config });
        }
        return true;
    };
    const deleteSchedulerConfig = (id: string) => {
        let newSchedulerConfigs = schedulerConfigs.filter(
            (config: ISchedulerConfig) => config.id != id
        );
        if (newSchedulerConfigs.length == schedulerConfigs.length) {
            return false;
        }

        setSchedulerConfigs(newSchedulerConfigs);
        return true;
    };
    const createSchedulerConfig = (config: Omit<ISchedulerConfig, "id">) => {
        let newSchedulerConfigs = [...schedulerConfigs];
        const newConfig = { id: new Date(), ...config };
        newSchedulerConfigs.push(newConfig);

        setSchedulerConfigs(newSchedulerConfigs);
        return true;
    };
    const setActiveSchedulerConfigById = (id: string) => {
        const config = getSchedulerConfig(id);
        if (config) {
            setActiveSchedulerConfig(config);
            return true;
        }
        return false;
    };

    // ALARM SETTINGS
    const [alarmEnabled, setAlarmEnabled] = useLocalStorageState(
        "alarm_setting",
        DEFAULT_LOCAL_STORAGE_SETTINGS.alarmEnabled
    );
    const [alarmSound, setAlarmSound] = useState(defaultSound);

    const [overtimeSetting, setOvertimeSetting] = useLocalStorageState(
        "overtimeSetting",
        false
    );

    // UNORDERED SETTINGS
    const [autostartSetting, setAutostartSetting] = useLocalStorageState(
        "autostartSetting",
        false
    );
    useEffect(() => {
        // import
        const newSchedulerConfigs = [...schedulerConfigs];
        newSchedulerConfigs.forEach((config) => {
            const schedule = config.schedule;
            for (let i = 0; i < config.schedule.length; i++) {
                if (typeof schedule[i].targetDuration === "string") {
                    schedule[i].targetDuration = new Date(
                        Date.parse(schedule[i].targetDuration)
                    );
                }
            }
        });
        setSchedulerConfigs(newSchedulerConfigs);
        setActiveSchedulerConfigById(activeSchedulerConfig.id);
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                schedulerSettings: {
                    schedulerConfigs,
                    getSchedulerConfig,
                    updateSchedulerConfig,
                    deleteSchedulerConfig,
                    createSchedulerConfig,

                    activeSchedulerConfig,
                    setActiveSchedulerConfigById,
                },
                alarmSettings: {
                    alarmEnabled,
                    setAlarmEnabled,

                    // volume: alarmVolume,
                    // setVolume: setAlarmVolume,

                    alarmSound: alarmSound,
                    // setAlarmSoundByName: ,
                },
                overtimeSetting,
                setOvertimeSetting,
                autostartSetting,
                setAutostartSetting,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
