import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import { ButtonOptionList } from "../SettingsComponents/SettingOptions/ButtonOptionList";
import { InputOption } from "../SettingsComponents/SettingOptions/InputOption";
import SettingForm from "../SettingsComponents/SettingForm";

export default function PomodoroConfigModal(props: any) {
    return (
        <ReactModal {...props}>
            <div className="flex gap-6 flex-col">
                <h1 className="text-3xl text-sub"> Pomodoro config </h1>
                <div className="flex gap-[24px] flex-col">
                    <SettingForm
                        title="Study duration"
                        description="Length of the study duration"
                        actionArea={
                            <ButtonOptionList
                                options={[
                                    { label: "5", value: 5 },
                                    { label: "10", value: 10 },
                                    { label: "15", value: 15 },
                                ]}
                                currentValue={15}
                                setValue={() => {}}
                                hasCustomOption={true}
                            ></ButtonOptionList>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Short break"
                        description="Length of the short break duration"
                        actionArea={
                            <ButtonOptionList
                                options={[
                                    { label: "5", value: 5 },
                                    { label: "10", value: 10 },
                                    { label: "15", value: 15 },
                                ]}
                                currentValue={5}
                                setValue={() => {}}
                            ></ButtonOptionList>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Long break"
                        description="Length of the long break duration"
                        actionArea={
                            <ButtonOptionList
                                options={[
                                    { label: "5", value: 5 },
                                    { label: "10", value: 10 },
                                    { label: "15", value: 15 },
                                ]}
                                currentValue={5}
                                setValue={() => {}}
                            ></ButtonOptionList>
                        }
                    ></SettingForm>
                    <SettingForm
                        title="Pomodoro cycle"
                        description="Number of pomodoros required for a long break"
                        actionArea={
                            <InputOption
                                currentValue={4}
                                setValue={(value: any) => {
                                    console.log(value);
                                }}
                                placeholder={"Enter a number"}
                                onFocus={() => {}}
                                isActive={true}
                            ></InputOption>
                        }
                    ></SettingForm>
                </div>
                <Button isFullWidth>ok</Button>
            </div>
        </ReactModal>
    );
}
