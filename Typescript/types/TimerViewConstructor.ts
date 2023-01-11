import { ITimerViewProps } from "../interfaces/ITimerViewProps";
import { TimerView } from "./TimerView";

export type TimerViewConstructor = (props: ITimerViewProps) => TimerView;
