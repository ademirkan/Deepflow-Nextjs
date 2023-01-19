import CircularCountdownView from "../components/TimerViews/CircularCountdownView";
import CircularStopwatchView from "../components/TimerViews/CircularStopwatchView";
import { SessionLabel } from "../components/SessionLabel";

import { TimerType } from "../Typescript/enums/TimerType";
import { ITimerCallbacks } from "../Typescript/interfaces/ITimerCallbacks";
import { ITimerProps } from "../Typescript/interfaces/ITimerProps";
import { ITimerViewProps } from "../Typescript/interfaces/ITimerViewProps";
import { TimerViewConstructor } from "../Typescript/types/TimerViewConstructor";
import { useScheduler } from "./useScheduler";
import { useTimerStateStore } from "../stores/useTimerStateStore";
import { useSessionHistoryStore } from "../stores/useSessionHistoryStore";

export default function useTimerProps(): ITimerProps {
    const { currentSession } = useScheduler();
    const callbacks = useTimerCallbacks();

    // TODO: placeholder
    const overtimeSetting = false;

    const VIEW_CONSTRUCTORS = {
        countdown: (props: ITimerViewProps) => {
            return (
                <CircularCountdownView
                    {...props}
                    clockwise={false}
                    labelArea={
                        <SessionLabel
                            label={currentSession.isBreak ? "break" : "study"}
                        />
                    }
                />
            );
        },

        stopwatch: (props: ITimerViewProps) => {
            return (
                <CircularStopwatchView
                    {...props}
                    labelArea={
                        <SessionLabel
                            label={currentSession.isBreak ? "break" : "study"}
                        ></SessionLabel>
                    }
                ></CircularStopwatchView>
            );
        },
    };

    const viewConstructor: TimerViewConstructor =
        currentSession.timerType == TimerType.countdown
            ? VIEW_CONSTRUCTORS.countdown
            : VIEW_CONSTRUCTORS.stopwatch;
    const targetDuration = currentSession.targetDuration;

    const output: ITimerProps = {
        viewConstructor,
        targetDuration,
        callbacks,
        overtime: overtimeSetting,
    };

    return output;
}

function useTimerCallbacks(): ITimerCallbacks {
    const { currentSession, next } = useScheduler();
    const [
        isTimerRunning,
        setIsTimerRunning,
        isTimerStarted,
        setIsTimerStarted,
    ] = useTimerStateStore((state) => [
        state.isTimerRunning,
        state.setIsTimerRunning,
        state.isTimerStarted,
        state.setIsTimerStarted,
    ]);
    const pushSession = useSessionHistoryStore((state) => state.pushSession);

    const callbacks: ITimerCallbacks = {
        onStart: (now) => {
            setIsTimerRunning(true);
            setIsTimerStarted(true);
            console.log("started");
        },
        onTick: (now, elapsedTime, startTime) => {
            console.log("Tick!", elapsedTime);
        },
        onEnd: (now, elapsedTime, startTime) => {
            /**
             prompt MeasurementModal
                onSubmit, pushSession(ratedSession)
             */
            setIsTimerRunning(false);
            setIsTimerStarted(false);
            next();
        },
        onReset: (now, elapsedTime, startTime) => {
            console.log("Reset!");
            setIsTimerRunning(false);
            setIsTimerStarted(false);
        },
        onPause: (now, elapsedTime, startTime) => {
            console.log("Stopped!");
            setIsTimerRunning(false);
        },
        onResume: (now, elapsedTime, startTime) => {
            console.log("resumed");
            setIsTimerRunning(true);
        },

        onTickEvents: [
            {
                timeElapsed: 5000,
                callback: (time) => {
                    console.log("5sec mark! " + time);
                },
            },
            {
                timeElapsed: 10000,
                callback: (time) => {
                    console.log("10sec mark! " + time);
                },
            },
        ],
    };

    return callbacks;
}
