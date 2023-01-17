import useStopwatch from "../../hooks/useStopwatch";
import React, { FC } from "react";
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
                height: "min(300px, 100%)",
                width: "min(300px, 100%)",
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
