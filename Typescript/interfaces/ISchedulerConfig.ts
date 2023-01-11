import { TimerSession } from "../types/TimerSession";

export interface ISchedulerConfig {
    id: string;
    name: string;
    schedule: TimerSession[];
}
