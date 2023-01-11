import React, { ReactElement } from "react";
import CircularProgress from "../CircularProgress";
import styles from "../../styles/CircularTimerView.module.css";
import { formatTime } from "../../helpers/formatTime";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";
import { Time } from "../../Typescript/types/Time";

// Props specific to CircularStopwatchView
interface ICircularStopwatchViewConstructorProps {
    labelArea?: ReactElement;
}

// General ITimerViewProps + Unique construtor props
interface ICircularStopwatchViewProps
    extends ICircularStopwatchViewConstructorProps,
        ITimerViewProps {}

export const CircularStopwatchView = (props: ICircularStopwatchViewProps) => {
    const isFinishable =
        props.isRunning && props.elapsedTime >= props.targetDuration;

    const button = !props.isStarted ? (
        <div className="button h-8 w-32 flex-grow-0" onClick={props.onStart}>
            start
        </div>
    ) : isFinishable ? (
        <div className="button h-8 w-32 flex-grow-0" onClick={props.onFinish}>
            finish
        </div>
    ) : (
        <div className="button h-8 w-32 flex-grow-0" onClick={props.onReset}>
            quit
        </div>
    );

    return (
        <>
            <CircularProgress
                filledPercent={1}
                thickness={0.03}
                animationDuration={"0s"}
                primaryColor={
                    !props.isStarted || isFinishable
                        ? "var(--main-color)"
                        : "var(--sub-color)"
                }
            />

            <div id={styles.innerUI}>
                {props.labelArea}
                <TextTimer
                    time={props.elapsedTime}
                    style={{ color: "var(--text-color)" }}
                />
                <div
                    id={styles.controlBar}
                    className="flex justify-center items-center h-16 "
                >
                    {button}
                </div>
            </div>
        </>
    );
};

interface ITextTimerProps {
    time: Time;
    style: object;
}

function TextTimer(props: ITextTimerProps) {
    return (
        <div className={styles.textTimer} style={props.style}>
            {formatTime(props.time)}
        </div>
    );
}

export default CircularStopwatchView;
