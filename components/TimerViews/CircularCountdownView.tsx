import React, { ReactElement } from "react";
import CircularProgress from "../CircularProgress";
import NasaCircularProgress from "../NasaCircularProgress";
import { Duration } from "../../Typescript/types/Duration";
import styles from "../../styles/CircularTimerView.module.css";
import { formatTime } from "../../helpers/formatTime";
import { ITimerViewProps } from "../../Typescript/interfaces/ITimerViewProps";
import TextButton from "../Buttons/TextButton";
import { useTheme } from "../../hooks/useTheme";

interface ICircularCountdownViewProps extends ITimerViewProps {
    clockwise?: boolean;
    labelArea?: ReactElement;
}

export default function CircularCountdownView(
    props: ICircularCountdownViewProps
) {
    const [themeName, setThemeByName] = useTheme();
    const clockwise = props.clockwise ? props.clockwise : false;
    let remainingTime =
        props.targetDuration.valueOf() - props.elapsedTime.valueOf();

    // calculate overtime duration
    let overtimeMs = 0;
    if (remainingTime < 0) {
        overtimeMs = remainingTime * -1;
    }

    if (themeName === "nasa") {
        return (
            <>
                <NasaCircularProgress
                    clockwise={clockwise}
                    thickness={0.03}
                    animationDuration={props.isRunning ? "1s" : "0.15s"}
                />

                <div id={styles.innerUI}>
                    {props.labelArea}

                    <TextTimer
                        duration={props.targetDuration - props.elapsedTime}
                        style={{ color: "var(--text-color)" }}
                    />
                    {overtimeMs === 0 ? (
                        <ControlBar isRunning={props.isRunning}>
                            {!props.isRunning ? (
                                <TextButton
                                    icon={
                                        <i className="fa-solid flex justify-center items-center fa-circle-play h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl " />
                                    }
                                    onClick={props.onStart}
                                />
                            ) : overtimeMs === 0 ? (
                                <>
                                    <TextButton
                                        icon={
                                            <i className="fa-solid flex justify-center items-center fa-clock-rotate-left h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl " />
                                        }
                                        onClick={props.onReset}
                                    />
                                    <TextButton
                                        icon={
                                            <i className="fa-solid flex justify-center items-center fa-circle-pause h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl" />
                                        }
                                        onClick={props.onPause}
                                    />
                                    <TextButton
                                        icon={
                                            <i className="fa-solid flex justify-center items-center fa-circle-chevron-right h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl"></i>
                                        }
                                        onClick={props.onFinish}
                                    />
                                </>
                            ) : (
                                <div className="button">break</div>
                            )}
                        </ControlBar>
                    ) : (
                        <div className="button">yeet</div>
                    )}
                </div>
            </>
        );
    }
    return (
        <>
            <CircularProgress
                filledPercent={
                    props.isRunning
                        ? (remainingTime - 900) / props.targetDuration.valueOf()
                        : remainingTime / props.targetDuration.valueOf()
                }
                clockwise={clockwise}
                thickness={0.03}
                animationDuration={props.isRunning ? "1s" : "0.15s"}
            />

            <div id={styles.innerUI}>
                {props.labelArea}

                <TextTimer
                    duration={props.targetDuration - props.elapsedTime}
                    style={{ color: "var(--text-color)" }}
                />
                {overtimeMs === 0 ? (
                    <ControlBar isRunning={props.isRunning}>
                        {!props.isRunning ? (
                            <TextButton
                                icon={
                                    <i className="fa-solid flex justify-center items-center fa-circle-play h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl " />
                                }
                                onClick={props.onStart}
                            />
                        ) : overtimeMs === 0 ? (
                            <>
                                <TextButton
                                    icon={
                                        <i className="fa-solid flex justify-center items-center fa-clock-rotate-left h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl " />
                                    }
                                    onClick={props.onReset}
                                />
                                <TextButton
                                    icon={
                                        <i className="fa-solid flex justify-center items-center fa-circle-pause h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl" />
                                    }
                                    onClick={props.onPause}
                                />
                                <TextButton
                                    icon={
                                        <i className="fa-solid flex justify-center items-center fa-circle-chevron-right h-16 w-16 p-4 text-sub transition-colors hover:text-main active:text-sub text-3xl"></i>
                                    }
                                    onClick={props.onFinish}
                                />
                            </>
                        ) : (
                            <div className="button">break</div>
                        )}
                    </ControlBar>
                ) : (
                    <div className="button">yeet</div>
                )}
            </div>
        </>
    );
}

interface ITextTimerProps {
    duration: Duration;
    style: object;
}

function TextTimer(props: ITextTimerProps) {
    return (
        <div className={styles.textTimer} style={props.style}>
            {formatTime(props.duration)}
        </div>
    );
}

interface IControlBar {
    isRunning: boolean;
    children: ReactElement;
}

function ControlBar(props: IControlBar) {
    return (
        <div id={styles.controlBar} className="flex justify-around h-16 ">
            {props.children}
        </div>
    );
}
