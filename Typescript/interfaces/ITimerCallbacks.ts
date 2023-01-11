import { Time } from "../types/Time";
import { TimerEvent } from "../types/TimerEvent";

/**
 * Interface for Timer callbacks object
 */
export interface ITimerCallbacks {
    onStart?: (currentTime: Time) => void; // called on initial timer start
    onTick?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // called on each tick interval
    onResume?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // called on each subsequent resume
    onPause?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // called on each timer pause
    onEnd?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // called on each
    onReset?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // called on timer reset
    onTickEvents?: Array<TimerEvent>; // scheduled timer events: (time, callback)
}
