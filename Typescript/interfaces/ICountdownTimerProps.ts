import { Duration } from "../types/Duration";
import { TimerViewConstructor } from "../types/TimerViewConstructor";
import { ITimerCallbacks } from "./ITimerCallbacks";

export interface ICountdownTimerProps {
    viewConstructor: TimerViewConstructor;
    targetDuration: Duration;
    callbacks: ITimerCallbacks;
    overtime: boolean;
}
