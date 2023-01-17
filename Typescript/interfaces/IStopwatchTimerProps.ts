import { Duration } from "../types/Duration";
import { TimerViewConstructor } from "../types/TimerViewConstructor";
import { ITimerCallbacks } from "./ITimerCallbacks";

export interface IStopwatchTimerProps {
    viewConstructor: TimerViewConstructor;
    targetDuration: Duration;
    callbacks: ITimerCallbacks;
}
