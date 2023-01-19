import { ReactElement, ReactNode } from "react";
import { useScheduler } from "../../hooks/useScheduler";
import useTimerProps from "../../hooks/useTimerProps";
import { TimerType } from "../../Typescript/enums/TimerType";
import CountdownTimer from "./CountdownTimer";
import StopwatchTimer from "./StopwatchTimer";

export function Timer() {
    const timerProps = useTimerProps();
    const { currentSession } = useScheduler();
    let timer: ReactNode;

    if (currentSession.timerType == TimerType.countdown) {
        timer = <CountdownTimer {...timerProps} />;
    } else {
        timer = <StopwatchTimer {...timerProps} />;
    }

    return timer;
}
