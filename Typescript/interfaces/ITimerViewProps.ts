import { Duration } from "../types/Duration";

export interface ITimerViewProps {
    targetDuration: Duration;
    isRunning: boolean;
    isStarted: boolean;
    elapsedTime: Duration;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onFinish?: () => void;
}
