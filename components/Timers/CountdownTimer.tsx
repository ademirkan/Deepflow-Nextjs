import useStopwatch from "../../hooks/useStopwatch";
import { ICountdownTimerProps } from "../../Typescript/interfaces/ICountdownTimerProps";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";

const CountdownTimer: (props: ICountdownTimerProps) => JSX.Element = (
    props
) => {
    // Stopwatch hook w/ logic
    const { elapsedTime, isRunning, isStarted, start, stop, reset, end } =
        useStopwatch(props.callbacks);

    // useStopwatch props for stopwatch view constructor
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

    // end countdown automatically
    if (!props.overtime && elapsedTime > props.targetDuration) {
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
