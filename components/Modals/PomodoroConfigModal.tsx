import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import {
    ButtonOption,
    CustomizableButtonOptionList,
    InputOption,
} from "../Settings/OptionsIndex";
import SettingComponent from "../Settings/SettingComponent";

export default function PomodoroConfigModal(props: any) {
    return (
        <ReactModal {...props}>
            <h1 className="text-3xl text-sub"> Pomodoro config </h1>
            <SettingComponent
                title="Study duration"
                description="Length of the study duration"
                actionArea={
                    <CustomizableButtonOptionList
                        options={[
                            { label: "5", value: 5 },
                            { label: "10", value: 10 },
                            { label: "15", value: 15 },
                        ]}
                        currentValue={15 * 60 * 1000}
                        setValue={() => {}}
                        toValue={(label) => parseInt(label) * 1000 * 60}
                    ></CustomizableButtonOptionList>
                }
            ></SettingComponent>
            <SettingComponent
                title="Short break"
                description="Length of the short break duration"
                actionArea={
                    <CustomizableButtonOptionList
                        options={[
                            { label: "5", value: 5 },
                            { label: "10", value: 10 },
                            { label: "15", value: 15 },
                        ]}
                        currentValue={15 * 60 * 1000}
                        setValue={() => {}}
                        toValue={(label) => parseInt(label) * 1000 * 60}
                    ></CustomizableButtonOptionList>
                }
            ></SettingComponent>
            <SettingComponent
                title="Long break"
                description="Length of the long break duration"
                actionArea={
                    <CustomizableButtonOptionList
                        options={[
                            { label: "5", value: 5 },
                            { label: "10", value: 10 },
                            { label: "15", value: 15 },
                        ]}
                        currentValue={15 * 60 * 1000}
                        setValue={() => {}}
                        toValue={(label) => parseInt(label) * 1000 * 60}
                    ></CustomizableButtonOptionList>
                }
            ></SettingComponent>
            <SettingComponent
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
            ></SettingComponent>
            <Button isFullWidth={true}>ok</Button>
        </ReactModal>
    );
}
