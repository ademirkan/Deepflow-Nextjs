import React, { ReactNode, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { TimerSession } from "../Typescript/types/TimerSession";

export const SessionsContext = React.createContext({
    sessions: [],
    pushSession: (session: TimerSession) => {},
});

interface Props {
    children?: ReactNode;
}

export default function SessionsProvider({ children }: Props) {
    const [sessions, setSessions] = useLocalStorageState("sessions", []);
    const pushSession = (session: TimerSession) => {
        setSessions([...sessions].push(session));
    };
    return (
        <SessionsContext.Provider
            value={{
                sessions,
                pushSession,
            }}
        >
            {children}
        </SessionsContext.Provider>
    );
}
