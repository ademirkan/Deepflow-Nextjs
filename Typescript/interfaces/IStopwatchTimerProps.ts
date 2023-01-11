import { Time } from "../types/Time";
import { TimerViewConstructor } from "../types/TimerViewConstructor";
import { ITimerCallbacks } from "./ITimerCallbacks";

export interface IStopwatchTimerProps {
    viewConstructor: TimerViewConstructor;
    targetDuration: Time;
    callbacks: ITimerCallbacks;
}
