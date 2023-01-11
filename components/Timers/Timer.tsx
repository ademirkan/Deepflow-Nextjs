import { ReactElement, ReactNode, useContext } from "react";
import { SchedulerContext } from "../../Contexts/SchedulerContext";
import useTimerProps from "../../Hooks/useTimerProps";
import { TimerType } from "../../Typescript/enums/TimerType";
import CountdownTimer from "./CountdownTimer";
import StopwatchTimer from "./StopwatchTimer";

export function Timer() {
    const timerProps = useTimerProps();
    const { currentSession } = useContext(SchedulerContext);
    let timer: ReactNode;

    if (currentSession.timerType == TimerType.countdown) {
        timer = <CountdownTimer {...timerProps} />;
    } else {
        timer = <StopwatchTimer {...timerProps} />;
    }

    return timer;
}
