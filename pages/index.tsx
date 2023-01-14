import Head from "next/head";
import Script from "next/script";
import { useContext } from "react";
import PageLayout from "../components/PageLayout";
import { QuickConfig } from "../components/QuickConfig";
import { SchedulerProgress } from "../components/SchedulerProgress";
import { Timer } from "../components/Timers/Timer";
import { TimerStateContext } from "../contexts/TimerStateContext";

export default function TimerPage() {
    const { isRunning } = useContext(TimerStateContext);
    return (
        <>
            <PageLayout isTimerActive={isRunning} actionArea={<QuickConfig />}>
                <main className="relative flex justify-center items-center flex-col gap-6 top-2">
                    <Timer />
                    <SchedulerProgress />
                </main>
            </PageLayout>
        </>
    );
}
