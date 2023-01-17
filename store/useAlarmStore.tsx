import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//@ts-ignore
import defaultSound from "../public/sounds/gentle.mp3";

interface AlarmState {
    isAlarmEnabled: boolean;
    setIsAlarmEnabled: (enabled: boolean) => void;
    volume: number;
    setVolume: (percent: number) => void;
    alarmSoundName: string; // don't want this to be public, but need to persist it...
    setAlarmSoundByName: (name: string) => void;
}

const DEFAULT_STATE: AlarmState = {
    isAlarmEnabled: true,
    setIsAlarmEnabled: (enabled) => {},

    volume: 0.5,
    setVolume: (percent) => {},

    alarmSoundName: "gentle.mp3",
    setAlarmSoundByName: (name) => {},
};
export const useAlarmStore = create<AlarmState>()(
    devtools(
        persist(
            (set) => ({
                isAlarmEnabled: DEFAULT_STATE.isAlarmEnabled,
                setIsAlarmEnabled: (enabled) =>
                    set((state) => ({ isAlarmEnabled: enabled })),
                volume: DEFAULT_STATE.volume,
                setVolume: (percent) => set((state) => ({ volume: percent })),
                alarmSoundName: DEFAULT_STATE.alarmSoundName,
                setAlarmSoundByName: (soundName) =>
                    set((state) => ({ alarmSoundName: soundName })),
            }),
            {
                name: "alarm-storage",
            }
        )
    )
);
