import { Duration } from "./Duration";

export type TimerEvent = {
    timeElapsed: Duration;
    callback: (now: Date, elapsedTime: Duration, startTime: Date) => void;
};
