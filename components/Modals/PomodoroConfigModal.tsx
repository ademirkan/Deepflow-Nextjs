import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import { ButtonOptionList } from "../Settings/ButtonOptionList";
import { InputOption } from "../Settings/InputOption";
import SettingForm from "../Settings/SettingForm";

export default function PomodoroConfigModal(props: any) {
    return (
        <ReactModal {...props}>
            <h1 className="text-3xl text-sub pb-2"> Pomodoro config </h1>
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
            <Button isFullWidth>ok</Button>
        </ReactModal>
    );
}
