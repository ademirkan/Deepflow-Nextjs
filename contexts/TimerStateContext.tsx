import React, { ReactElement, useState } from "react";

export const TimerStateContext = React.createContext({
    isRunning: false,
    isStarted: false,
    setIsRunning: (bool: boolean) => {},
    setIsStarted: (bool: boolean) => {},
});

interface ITimerStateProviderProps {
    children: ReactElement;
}

export default function TimerStateProvider(props: ITimerStateProviderProps) {
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    return (
        <TimerStateContext.Provider
            value={{
                isRunning,
                isStarted,
                setIsRunning,
                setIsStarted,
            }}
        >
            {props.children}
        </TimerStateContext.Provider>
    );
}
