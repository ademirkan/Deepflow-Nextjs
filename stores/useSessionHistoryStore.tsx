import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TimerSession } from "../Typescript/types/TimerSession";

interface SessionHistoryState {
    todaysSessions: TimerSession[];
    pushSession: (session: TimerSession) => void;
}

export const useSessionHistoryStore = create<SessionHistoryState>()(
    devtools(
        persist(
            (set) => ({
                todaysSessions: [],
                pushSession: (session) =>
                    set((state) => ({
                        todaysSessions: [...state.todaysSessions, session],
                    })),
            }),
            {
                name: "session-history-storage",
            }
        )
    )
);
