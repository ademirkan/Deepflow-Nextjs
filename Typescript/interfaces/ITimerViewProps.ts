import { Time } from "../types/Time";

export interface ITimerViewProps {
    targetDuration: Time;
    isRunning: boolean;
    isStarted: boolean;
    elapsedTime: Time;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onFinish?: () => void;
}
