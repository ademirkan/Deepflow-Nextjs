import useStopwatch from "../../hooks/useStopwatch";
import { ICountdownTimerProps } from "../../Typescript/Interfaces/ICountdownTimerProps";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";

const CountdownTimer: (props: ICountdownTimerProps) => JSX.Element = (
    props
) => {
    // Stopwatch hook w/ logic
    const { time, isRunning, isStarted, start, stop, reset, end } =
        useStopwatch(props.callbacks);

    // useStopwatch props for stopwatch view constructor
    const hookProps: ITimerViewProps = {
        targetDuration: props.targetDuration,
        isRunning,
        isStarted,
        elapsedTime: time,
        onStart: start,
        onPause: stop,
        onReset: reset,
        onFinish: end,
    };

    const timerView = props.viewConstructor({ ...hookProps });

    // end countdown automatically
    if (!props.overtime && time > props.targetDuration) {
        end();
    }

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

export default CountdownTimer;
