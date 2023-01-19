import { useRef, useEffect, useState } from "react";
import { TimerEvent } from "../Typescript/types/TimerEvent";
import { ITimerCallbacks } from "../Typescript/interfaces/ITimerCallbacks";

export default function useStopwatch(
    callbacks: ITimerCallbacks,
    tickInterval: number = 1000
) {
    // States
    const [elapsedTime, setElapsedTime] = useState(0); // current time
    const [isRunning, setIsRunning] = useState(false); // current timer state
    const [isStarted, setIsStarted] = useState(false); // true if timer has started, false when reset

    //Refs
    const elapsedTimeRef = useRef(0); // synced with elapsedTime, used to track elapsed time in tick() w/o closure issues
    const lastUpdateRef = useRef(new Date(0)); // tracks Date of last update to measure tick delta
    const callbacksRef = useRef(callbacks); // tracks callbacks: ITimerCallbacks object
    const startTimeRef = useRef(new Date(0)); // tracks initial start time
    const eventsRef = useRef<Array<TimerEvent>>( // tracks array of remaining scheduled TimerEvents in callbacks
        callbacks.onTickEvents === undefined ? [] : [...callbacks.onTickEvents]
    );

    /**
     * isRunning effect: set / clear interval on isRunning change
     */
    useEffect(() => {
        let interval: any = null;
        if (isRunning) {
            interval = setInterval(tick, tickInterval);
        }

        return () => {
            // clears interval on component unmount
            clearInterval(interval);
        };
    }, [isRunning]);

    /**
     * Update callbacksRef when callbacks object is changed
     */
    useEffect(() => {
        callbacksRef.current = callbacks; // updates callbacksRef
        let descendingEvents = // sort events array by time
            (
                callbacks.onTickEvents === undefined
                    ? []
                    : [...callbacks.onTickEvents]
            ).sort((a, b) => b.timeElapsed - a.timeElapsed);

        // discard all events that have already occured
        while (
            descendingEvents.length !== 0 &&
            descendingEvents[descendingEvents.length - 1].timeElapsed <
                elapsedTime
        ) {
            descendingEvents.pop();
        }

        // set eventsRef to new events
        eventsRef.current = descendingEvents;
    }, [callbacks]);

    /**
     * Runs at every interval, updates time
     */
    function tick() {
        let now = new Date();
        let deltaMs = delta(lastUpdateRef.current, now);
        lastUpdateRef.current = now;

        setElapsedTime((prevTime) => {
            elapsedTimeRef.current = prevTime + deltaMs;
            return elapsedTimeRef.current;
        });

        if (callbacksRef.current.onTick !== undefined) {
            callbacksRef.current.onTick(
                now,
                elapsedTimeRef.current,
                startTimeRef.current
            );
        }

        if (
            eventsRef.current.length &&
            eventsRef.current[eventsRef.current.length - 1].timeElapsed <=
                elapsedTimeRef.current
        ) {
            eventsRef.current
                .pop()
                ?.callback(now, elapsedTimeRef.current, startTimeRef.current);
        }
    }

    /**
     * Start / Resume timer
     */
    function start() {
        let currentTime = new Date();
        if (isRunning) throw Error("Stopwatch is already running");

        if (!isStarted) {
            callbacksRef.current.onStart?.(currentTime);
            setIsStarted(true);
        } else {
            callbacksRef.current.onResume?.(
                currentTime,
                elapsedTime,
                startTimeRef.current
            );
        }

        if (!startTimeRef.current) {
            startTimeRef.current = currentTime;
        }

        setIsRunning(true);
        lastUpdateRef.current = new Date();
    }

    /**
     * Pauses timer
     */
    function stop() {
        setIsRunning(false);
        callbacksRef.current.onPause?.(
            new Date(),
            elapsedTime,
            startTimeRef.current
        );
    }

    /**
     * Resets timer
     */
    function reset() {
        callbacksRef.current.onReset?.(
            new Date(),
            elapsedTime,
            startTimeRef.current
        );
        eventsRef.current = (
            callbacks.onTickEvents === undefined
                ? []
                : [...callbacks.onTickEvents]
        ).sort((a, b) => b.timeElapsed - a.timeElapsed);
        setIsStarted(false);
        setIsRunning(false);
        setElapsedTime(0);
        elapsedTimeRef.current = 0;
    }

    /**
     * Ends timer
     */
    function end() {
        setElapsedTime(0);
        elapsedTimeRef.current = 0;
        setIsStarted(false);
        setIsRunning(false);
        callbacksRef.current.onEnd?.(
            new Date(),
            elapsedTime,
            startTimeRef.current
        );
    }

    return { elapsedTime, isRunning, isStarted, start, stop, reset, end };
}

/**
 * Returns how much time (ms) has passed since delta() was last called
 */
function delta(start: Date, end: Date) {
    return end.valueOf() - start.valueOf();
}
