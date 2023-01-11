import { useRef, useEffect, useState } from "react";

// imparative vs declarative

function useCountdown(duration, options = {}, events = []) {
  // States
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // true if timer has started, false when reset

  //Refs
  const lastUpdateRef = useRef(null);
  const callbacksRef = useRef({
    onFirstStart: options.onFirstStart, // called only for first start
    onStart: options.onStart, // called for each start & resume except first start
    onFinish: options.onFinish, // called when time reaches duration
    onTick: options.onTick, // called for each tick interval
    onStop: options.onStop, // called for each pause
    onReset: options.onReset, // called when timer is reset
  });
  const startTimeRef = useRef(null);
  const eventsRef = useRef([...events]);
  const initialEventsRef = useRef(events);
  const { tickInterval = 1000 } = options;

  // Toggle the timer on and off when isRunning is changed
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(tick, tickInterval);
    }

    // is called next time isRunning changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    callbacksRef.current = {
      onFirstStart: options.onFirstStart,
      onStart: options.onStart,
      onFinish: options.onFinish,
      onTick: options.onTick,
      onStop: options.onStop,
      onReset: options.onReset,
    };
  }, [options]);

  useEffect(() => {
    console.log("ASK OMER ABOUT THIS -- DEPENDENCY = 1 inital render?");

    // sort events array by time
    let descendingEvents = [...events].sort((a, b) => b.time - a.time);

    // discard all events that have already occured
    while (
      descendingEvents.length !== 0 &&
      descendingEvents[descendingEvents.length - 1].time < time
    ) {
      descendingEvents.pop();
    }

    // set eventsRef to new events
    eventsRef.current = descendingEvents;
  }, [events]);

  // Calculates how much time (ms) has passed since delta() was last called
  function delta() {
    if (lastUpdateRef.current === undefined) {
      lastUpdateRef.current = new Date();
    }
    const now = new Date();
    const deltaMs = now - lastUpdateRef.current;
    lastUpdateRef.current = now;
    return deltaMs;
  }

  // Runs at every interval, updates time
  function tick() {
    let deltaMs = delta();
    let nextTime;
    setTime((prevTime) => {
      nextTime = prevTime + deltaMs;
      return nextTime > duration ? duration : nextTime;
    });

    if (nextTime >= duration) {
      callbacksRef.current.onFinish(startTimeRef.current);
      startTimeRef.current = null;
      reset();
    } else {
      callbacksRef.current.onTick();
    }

    if (
      eventsRef.current.length &&
      eventsRef.current[eventsRef.current.length - 1].time <= nextTime
    ) {
      console.log(eventsRef.current[eventsRef.current.length - 1].time);
      console.log(nextTime);
      eventsRef.current.pop().callback();
    }
  }

  /** Public Functions */

  function start() {
    if (duration.current < 1000)
      throw new Error(
        "Cannot start a countdown with duration less than 1000ms."
      );
    if (isRunning) throw Error("Countdown is already running");

    if (!isStarted) {
      callbacksRef.current.onFirstStart();
      setIsStarted(true);
    } else {
      callbacksRef.current.onStart();
    }

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    setIsRunning(true);
    lastUpdateRef.current = new Date();
  }

  function stop() {
    setIsRunning(false);
    callbacksRef.current.onStop();
  }

  function reset() {
    callbacksRef.current.onReset();
    eventsRef.current = [...initialEventsRef.current].sort(
      (a, b) => b.time - a.time
    );
    setIsStarted(false);
    setIsRunning(false);
    setTime(0);
  }

  return { time, isRunning, start, stop, reset };
}

export default useCountdown;
