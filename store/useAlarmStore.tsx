import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//@ts-ignore
import defaultSound from "../public/sounds/gentle.mp3";

interface AlarmState {
    isAlarmEnabled: boolean;
    setIsAlarmEnabled: (enabled: boolean) => void;
    volume: number;
    setVolume: (percent: number) => void;

    alarmSound: Buffer;
    // alarmSoundName: string; // don't want this to be public, but need to persist it...
    // setAlarmSoundByName: (name: string) => void;
}

export const useAlarmStore = create<AlarmState>()(
    devtools(
        persist(
            (set) => ({
                isAlarmEnabled: true,
                setIsAlarmEnabled: (enabled) =>
                    set((state) => ({ isAlarmEnabled: enabled })),
                volume: 0.5,
                setVolume: (percent) => set((state) => ({ volume: percent })),
                alarmSound: defaultSound,
            }),
            {
                name: "alarm-storage",
            }
        )
    )
);
