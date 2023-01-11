import { Time } from "../types/Time";
import { TimerViewConstructor } from "../types/TimerViewConstructor";
import { ITimerCallbacks } from "./ITimerCallbacks";

export interface ICountdownTimerProps {
    viewConstructor: TimerViewConstructor;
    targetDuration: Time;
    callbacks: ITimerCallbacks;
    overtime: boolean;
}
