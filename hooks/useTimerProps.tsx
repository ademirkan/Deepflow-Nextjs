import { useContext } from "react";
import CircularCountdownView from "../components/TimerViews/CircularCountdownView";
import CircularStopwatchView from "../components/TimerViews/CircularStopwatchView";
import { SessionLabel } from "../components/SessionLabel";
import { SchedulerContext } from "../contexts/SchedulerContext";
import { SessionsContext } from "../contexts/SessionsContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { TimerStateContext } from "../contexts/TimerStateContext";
import { TimerType } from "../Typescript/enums/TimerType";
import { ITimerCallbacks } from "../Typescript/interfaces/ITimerCallbacks";
import { ITimerProps } from "../Typescript/interfaces/ITimerProps";
import { ITimerViewProps } from "../Typescript/interfaces/ITimerViewProps";
import { TimerView } from "../Typescript/Types/TimerView";
import { TimerViewConstructor } from "../Typescript/types/TimerViewConstructor";

/**
    viewConstructor: TimerViewConstructor;
    targetDuration: Time;
    callbacks: ITimerCallbacks;
    overtime: boolean; 
 */
export default function useTimerProps(): ITimerProps {
    const { currentSession } = useContext(SchedulerContext);
    const { overtimeSetting } = useContext(SettingsContext);
    const callbacks = useTimerCallbacks();

    const VIEW_CONSTRUCTORS = {
        countdown: (props: ITimerViewProps) => {
            return (
                <CircularCountdownView
                    {...props}
                    clockwise={false}
                    labelArea={
                        <SessionLabel
                            label={currentSession.isBreak ? "break" : "study"}
                        ></SessionLabel>
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
    // import SessionContext: pushSession
    // import SchedulerContext: currentSession, next
    // import SettingsContext: alarmSetting

    const { currentSession, next } = useContext(SchedulerContext);
    const { isRunning, isStarted, setIsRunning, setIsStarted } =
        useContext(TimerStateContext);
    const { pushSession } = useContext(SessionsContext);
    const callbacks: ITimerCallbacks = {
        onStart: (time) => {
            setIsRunning(true);
            console.log("started");
        },
        onTick: (time, elapsedTime, startTime) => {
            console.log("Tick!");
        },
        onEnd: (time, elapsedTime, startTime) => {
            /**
             prompt MeasurementModal
                onSubmit, pushSession(ratedSession)
             */
            setIsRunning(false);
            setIsStarted(false);
            next();
        },
        onReset: (time, elapsedTime, startTime) => {
            console.log("Reset!");
            setIsRunning(false);
            setIsStarted(false);
        },
        onPause: (time, elapsedTime, startTime) => {
            console.log("Stopped!");
            setIsRunning(false);
        },
        onResume: (time, elapsedTime, startTime) => {
            console.log("resumed");
            setIsRunning(true);
        },

        onTickEvents: [
            {
                time: new Date(10000),
                callback: (time) => {
                    console.log("10sec mark! " + time);
                },
            },
            {
                time: new Date(4000),
                callback: (time) => {
                    console.log("4sec mark! " + time);
                },
            },
            {
                time: new Date(3000),
                callback: (time) => {
                    console.log("3sec mark! " + time);
                },
            },
            {
                time: new Date(9000),
                callback: (time) => {
                    console.log("9sec mark! " + time);
                },
            },
        ],
    };

    return callbacks;
}
