import { useEffect } from "react";
import { useAlarm } from "../../hooks/useAlarm";
import useStopwatch from "../../hooks/useStopwatch";
import useTimerState from "../../hooks/useTimerState";
import { useAlarmStore } from "../../stores/useAlarmStore";
import { useTimerStateStore } from "../../stores/useTimerStateStore";
import { ICountdownTimerProps } from "../../Typescript/interfaces/ICountdownTimerProps";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";

const CountdownTimer: (props: ICountdownTimerProps) => JSX.Element = (
    props
) => {
    // Stopwatch hook w/ logic
    const stopwatch = useStopwatch(props.callbacks);
    const { resetRequested, setResetRequested } = useTimerState();
    useEffect(() => {
        if (resetRequested) {
            stopwatch.reset();
            setResetRequested(false);
        }
    }, [resetRequested]);

    // useStopwatch props for stopwatch view constructor
    const hookProps: ITimerViewProps = {
        targetDuration: props.targetDuration,
        isRunning: stopwatch.isRunning,
        isStarted: stopwatch.isStarted,
        elapsedTime: stopwatch.elapsedTime,
        onStart: stopwatch.start,
        onPause: stopwatch.stop,
        onReset: stopwatch.reset,
        onFinish: stopwatch.end,
    };

    const timerView = props.viewConstructor({ ...hookProps });
    const alarm = useAlarm();
    const isAlarmEnabled = useAlarmStore((state) => state.isAlarmEnabled);

    // end countdown automatically
    if (!props.overtime && stopwatch.elapsedTime >= props.targetDuration) {
        stopwatch.end();
        if (isAlarmEnabled) {
            alarm.play();
            const alarmCallback = () => {
                alarm.stop();
            };
            document.addEventListener("click", alarmCallback, { once: true });
        }
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
