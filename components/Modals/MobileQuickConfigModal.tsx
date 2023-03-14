import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import { InputOption } from "../SettingsComponents/SettingOptions/InputOption";
import SettingForm from "../SettingsComponents/SettingForm";
import { useSchedulerStore } from "../../stores/useSchedulerStore";
import { TimerType } from "../../Typescript/enums/TimerType";
import { ButtonOptionList } from "../SettingsComponents/SettingOptions/ButtonOptionList";

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

    const handlePomodoroStudyDurationChange = (value: any) => {
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

    const handlePomodoroShortBreakChange = (value: any) => {
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

    const handlePomodoroLongBreakChange = (value: any) => {
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

    const handlePomodoroLongBreakReqChange = (value: any) => {
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

    const handleSchedulerChange = (value: any) => {
        updateSchedulerConfig(value, activeSchedulerConfig);
    };

    const handleAlarmChange = (value: any) => {};

    return (
        <ReactModal {...props}>
            <div className="flex gap-6 flex-col">
                <h1 className="text-3xl text-sub"> Timer settings </h1>
                <div className="flex gap-[0.5rem] flex-col">
                    <SettingForm
                        title="Study duration"
                        inputArea={
                            <ButtonOptionList
                                currentValue={"POMODORO_SCHEDULER"}
                                setValue={() => {}}
                                options={[
                                    {
                                        label: "pomodoro",
                                        value: "POMODORO_SCHEDULER",
                                    },
                                    {
                                        label: "stopwatch",
                                        value: "STOPWATCH_SCHEDULER",
                                    },
                                ]}
                            ></ButtonOptionList>
                        }
                    ></SettingForm>

                    <SettingForm
                        title="Alarm"
                        inputArea={
                            <ButtonOptionList
                                currentValue={true}
                                setValue={() => {}}
                                options={[
                                    {
                                        label: "disabled",
                                        value: false,
                                    },
                                    {
                                        label: "enabled",
                                        value: true,
                                    },
                                ]}
                            ></ButtonOptionList>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Short break"
                        inputArea={
                            <InputOption
                                currentValue={shortBreakDuration / 60000}
                                setValue={handlePomodoroShortBreakChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Long break"
                        inputArea={
                            <InputOption
                                currentValue={longBreakDuration / 60000}
                                setValue={handlePomodoroLongBreakChange}
                                onFocus={() => {}}
                            ></InputOption>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Pomodoro cycle"
                        description="Number of pomodoros required for a long break"
                        inputArea={
                            <InputOption
                                currentValue={numStudySessions}
                                setValue={handlePomodoroLongBreakReqChange}
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
