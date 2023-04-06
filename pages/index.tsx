import PageLayout from "../components/PageLayout";
import { QuickConfig } from "../components/QuickConfig";
import { SchedulerProgress } from "../components/SchedulerProgress";
import { Timer } from "../components/Timers/Timer";
import useTimerState from "../hooks/useTimerState";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

export default function TimerPage() {
    const { isTimerRunning } = useTimerState();
    const [user, error, loading] = useAuthState(auth);

    return (
        <PageLayout isTimerActive={isTimerRunning} actionArea={<QuickConfig />}>
            <main className="relative flex justify-center items-center flex-col gap-6 top-2">
                <Timer />
                <SchedulerProgress />
            </main>
        </PageLayout>
    );
}
