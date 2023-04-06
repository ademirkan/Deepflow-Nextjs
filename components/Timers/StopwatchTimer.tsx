import useStopwatch from "../../hooks/useStopwatch";
import React from "react";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";
import { ITimerProps } from "../../Typescript/interfaces/ITimerProps";

const StopwatchTimer = (props: ITimerProps) => {
    // Stopwatch hook w/ logic
    const { elapsedTime, isRunning, isStarted, start, stop, reset, end } =
        useStopwatch(props.callbacks);

    // props for stopwatch view constructor
    const hookProps: ITimerViewProps = {
        targetDuration: props.targetDuration,
        isRunning,
        isStarted,
        elapsedTime,
        onStart: start,
        onPause: stop,
        onReset: reset,
        onFinish: end,
    };

    const timerView = props.viewConstructor({ ...hookProps });

    return (
        <div
            style={{
                position: "relative",
                height: "clamp(200px, 100%, 300px)",
                width: "clamp(200px, 100%, 300px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {timerView}
        </div>
    );
};

export default StopwatchTimer;
