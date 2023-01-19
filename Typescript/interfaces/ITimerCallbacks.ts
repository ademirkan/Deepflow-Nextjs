import { Duration } from "../types/Duration";
import { TimerEvent } from "../types/TimerEvent";

/**
 * Interface for Timer callbacks object
 */
export interface ITimerCallbacks {
    onStart?: (now: Date, elapsedTime?: Duration) => void; // called on initial timer start
    onTick?: (now: Date, elapsedTime: Duration, startTime: Date) => void; // called on each tick interval
    onResume?: (now: Date, elapsedTime: Duration, startTime: Date) => void; // called on each subsequent resume
    onPause?: (now: Date, elapsedTime: Duration, startTime: Date) => void; // called on each timer pause
    onEnd?: (now: Date, elapsedTime: Duration, startTime: Date) => void; // called on each
    onReset?: (now: Date, elapsedTime: Duration, startTime: Date) => void; // called on timer reset
    onTickEvents?: Array<TimerEvent>; // scheduled timer events: (time, callback)
}
