import { Duration } from "./Duration";

export type TimerEvent = {
    timeElapsed: Duration;
    callback: (
        currentTime: Date,
        startTime: Date,
        elapsedTime: Duration
    ) => void;
};
