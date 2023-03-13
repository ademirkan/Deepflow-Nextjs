import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import { InputOption } from "../SettingsComponents/SettingOptions/InputOption";
import SettingForm from "../SettingsComponents/SettingForm";
import { useSchedulerStore } from "../../stores/useSchedulerStore";
import { TimerType } from "../../Typescript/enums/TimerType";

export default function MobileQuickConfigModal(props: any) {
    const [activeSchedulerConfig, updateSchedulerConfig] = useSchedulerStore(
        (state) => [state.activeSchedulerConfig, state.updateSchedulerConfig]
    );

    const studyDuration = activeSchedulerConfig.schedule[0].targetDuration;
    const shortBreakDuration = activeSchedulerConfig.schedule[1].targetDuration;
    const longBreakDuration =
        activeSchedulerConfig.schedule[
            activeSchedulerConfig.schedule.length - 1
        ].targetDuration;
    const numStudySessions = activeSchedulerConfig.schedule.filter((item) => {
        return !item.isBreak;
    }).length;

    const handleStudyDurationChange = (value: any) => {
        let newSchedule = [...activeSchedulerConfig.schedule];
        for (let i = 0; i < newSchedule.length; i++) {
            newSchedule[i] = { ...newSchedule[i] };

            if (!newSchedule[i].isBreak) {
                newSchedule[i].targetDuration = value * 60000;
            }
        }

        updateSchedulerConfig("POMODORO_SCHEDULER", {
            name: "Pomodoro",
            schedule: newSchedule,
        });
    };

    const handleShortBreakChange = (value: any) => {
        let newSchedule = [...activeSchedulerConfig.schedule];
        for (let i = 0; i < newSchedule.length; i++) {
            newSchedule[i] = { ...newSchedule[i] };
            if (!newSchedule[i].isBreak) {
                newSchedule[i + 1].targetDuration = value * 60000;
            }
        }

        newSchedule[activeSchedulerConfig.schedule.length - 1].targetDuration =
            longBreakDuration;

        updateSchedulerConfig("POMODORO_SCHEDULER", {
            name: "Pomodoro",
            schedule: newSchedule,
        });
    };

    const handleLongBreakChange = (value: any) => {
        let newSchedule = [...activeSchedulerConfig.schedule];
        newSchedule[activeSchedulerConfig.schedule.length - 1] = {
            ...newSchedule[activeSchedulerConfig.schedule.length - 1],
        };
        newSchedule[activeSchedulerConfig.schedule.length - 1].targetDuration =
            value * 60000;

        updateSchedulerConfig("POMODORO_SCHEDULER", {
            name: "Pomodoro",
            schedule: newSchedule,
        });
    };

    const handleLongBreakRequiredChange = (value: any) => {
        let newSchedule = [];

        for (let i = 0; i < value; i++) {
            newSchedule.push({
                timerType: TimerType.countdown,
                targetDuration: studyDuration,
                isBreak: false,
            });
            newSchedule.push({
                timerType: TimerType.countdown,
                targetDuration: shortBreakDuration,
                isBreak: true,
            });
        }
        newSchedule.push({
            timerType: TimerType.countdown,
            targetDuration: longBreakDuration,
            isBreak: true,
        });

        updateSchedulerConfig("POMODORO_SCHEDULER", {
            name: "Pomodoro",
            schedule: newSchedule,
        });
    };

    return (
        <ReactModal {...props}>
            <div className="flex gap-6 flex-col">
                <h1 className="text-3xl text-sub"> Pomodoro config </h1>
                <div className="flex gap-[24px] flex-col">
                    <SettingForm
                        title="Study duration"
                        description="Length of the study duration"
                        actionArea={
                            <InputOption
                                currentValue={studyDuration / 60000}
                                setValue={handleStudyDurationChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Short break"
                        description="Length of the short break duration"
                        actionArea={
                            <InputOption
                                currentValue={shortBreakDuration / 60000}
                                setValue={handleShortBreakChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Long break"
                        description="Length of the long break duration"
                        actionArea={
                            <InputOption
                                currentValue={longBreakDuration / 60000}
                                setValue={handleLongBreakChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Pomodoro cycle"
                        description="Number of pomodoros required for a long break"
                        actionArea={
                            <InputOption
                                currentValue={numStudySessions}
                                setValue={handleLongBreakRequiredChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                </div>
                <Button isFullWidth onClick={props.onRequestClose}>
                    ok
                </Button>
            </div>
        </ReactModal>
    );
}
