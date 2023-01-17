import Head from "next/head";
import Script from "next/script";
import PageLayout from "../components/PageLayout";
import { QuickConfig } from "../components/QuickConfig";
import { SchedulerProgress } from "../components/SchedulerProgress";
import { Timer } from "../components/Timers/Timer";
import { useTimerStatusStore } from "../store/useTimerStatusStore";

export default function TimerPage() {
    const isTimerRunning = useTimerStatusStore((state) => state.isTimerRunning);
    return (
        <>
            <PageLayout
                isTimerActive={isTimerRunning}
                actionArea={<QuickConfig />}
            >
                <main className="relative flex justify-center items-center flex-col gap-6 top-2">
                    <Timer />
                    <SchedulerProgress />
                </main>
            </PageLayout>
        </>
    );
}
