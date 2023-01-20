import React, { ReactElement, useState } from "react";
import CircularProgress from "../CircularProgress";
import styles from "../../styles/CircularTimerView.module.css";
import { formatTime } from "../../helpers/formatTime";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";
import { Duration } from "../../Typescript/types/Duration";

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

    const [circleColor, setCircleColor] = useState("var(--main-color)");

    const button = !props.isStarted ? (
        <div
            className="flex transition-colors bg-sub text-bg hover:text-subalt active:text-subalt hover:bg-main active:bg-sub flex-row justify-center rounded-md items-center h-8 w-32 flex-grow-0"
            onClick={props.onStart}
            onMouseDown={() => setCircleColor("var(--sub-color)")}
            onMouseUp={() => setCircleColor("var(--main-color)")}
        >
            start
        </div>
    ) : isFinishable ? (
        <div
            className="flex transition-colors bg-sub text-bg hover:text-subalt active:text-subalt hover:bg-main active:bg-sub flex-row justify-center rounded-md items-center h-8 w-32 flex-grow-0"
            onClick={props.onFinish}
        >
            finish
        </div>
    ) : (
        <div
            className="flex transition-colors bg-sub text-bg hover:text-subalt active:text-subalt hover:bg-main active:bg-sub flex-row justify-center rounded-md items-center h-8 w-32 flex-grow-0"
            onClick={props.onReset}
        >
            quit
        </div>
    );

    return (
        <>
            <CircularProgress
                filledPercent={1}
                thickness={0.03}
                animationDuration={"0s"}
                primaryColor={circleColor}
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
    time: Duration;
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
