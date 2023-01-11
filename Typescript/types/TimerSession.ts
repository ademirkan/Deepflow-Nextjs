import { TimerType } from "../enums/TimerType";

export type TimerSession = {
  targetDuration: Date;
  timerType: TimerType;
  isBreak: boolean;
};
