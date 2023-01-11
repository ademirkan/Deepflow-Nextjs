import { useRef, useEffect, useState } from "react";
import { TimerEvent } from "../Typescript/types/TimerEvent";
import { ITimerCallbacks } from "../Typescript/interfaces/ITimerCallbacks";

export default function useStopwatch(
    callbacks: ITimerCallbacks,
    tickInterval: number = 1000
) {
    // States
    const [time, setTime] = useState(new Date(0)); // current time
    const [isRunning, setIsRunning] = useState(false); // current timer state
    const [isStarted, setIsStarted] = useState(false); // true if timer has started, false when reset

    //Refs
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
            ).sort((a, b) => b.time.valueOf() - a.time.valueOf());

        // discard all events that have already occured
        while (
            descendingEvents.length !== 0 &&
            descendingEvents[descendingEvents.length - 1].time.valueOf() <
                time.valueOf()
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
        let nextTime = now;
        let deltaMs = delta(lastUpdateRef.current, now);
        lastUpdateRef.current = now;

        setTime((prevTime) => {
            nextTime = new Date(prevTime.valueOf() + deltaMs.valueOf());
            return nextTime;
        });

        if (callbacksRef.current.onTick !== undefined) {
            callbacksRef.current.onTick(time, now, startTimeRef.current);
        }

        if (
            eventsRef.current.length &&
            eventsRef.current[eventsRef.current.length - 1].time <= nextTime
        ) {
            eventsRef.current.pop()?.callback(time, now, startTimeRef.current);
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
                time,
                currentTime,
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
        callbacksRef.current.onPause?.(time, new Date(), startTimeRef.current);
    }

    /**
     * Resets timer
     */
    function reset() {
        callbacksRef.current.onReset?.(time, new Date(), startTimeRef.current);
        eventsRef.current = (
            callbacks.onTickEvents === undefined
                ? []
                : [...callbacks.onTickEvents]
        ).sort((a, b) => b.time.valueOf() - a.time.valueOf());
        setIsStarted(false);
        setIsRunning(false);
        setTime(new Date(0));
    }

    /**
     * Ends timer
     */
    function end() {
        setTime(new Date(0));
        setIsStarted(false);
        setIsRunning(false);
        callbacksRef.current.onEnd?.(time, new Date(), startTimeRef.current);
    }

    return { time, isRunning, isStarted, start, stop, reset, end };
}

/**
 * Returns how much time (ms) has passed since delta() was last called
 */
function delta(start: Date, end: Date) {
    return end.valueOf() - start.valueOf();
}
