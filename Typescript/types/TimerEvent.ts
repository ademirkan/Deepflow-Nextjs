import { Time } from "./Time";

export type TimerEvent = {
  time: Time;
  callback: (currentTime: Time, startTime: Time, elapsedTime: Time) => void;
};
