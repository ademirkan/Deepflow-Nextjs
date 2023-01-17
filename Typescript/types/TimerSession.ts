import { TimerType } from "../enums/TimerType";
import { Duration } from "./Duration";

export type TimerSession = {
    targetDuration: Duration;
    timerType: TimerType;
    isBreak: boolean;
};
