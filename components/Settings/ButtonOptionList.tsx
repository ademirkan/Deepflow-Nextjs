import Button from "../Buttons/Button";
import { InputOption } from "./InputOption";

interface IButtonOptionList {
    options: SettingOption[];
    currentValue: any;
    setValue: (value: any) => void;
    hasCustomOption?: boolean;
}

interface SettingOption {
    label: string;
    value: any;
}

export function ButtonOptionList(props: IButtonOptionList) {
    return (
        <>
            {props.options.map((option) => {
                return (
                    <Button
                        isFullWidth
                        onClick={() => {
                            props.setValue(option.value);
                        }}
                        state={
                            option.value === props.currentValue
                                ? "active"
                                : "default"
                        }
                    >
                        {option.label}
                    </Button>
                );
            })}
            {/* {props.hasCustomOption && (
                    <InputOption
                        placeholder={"custom"}
                        setValue={(value) => {
                            props.setValue(value);
                        }}
                        isActive={props.currentValue === -1}
                        onFocus={() => props.setValue(-1)}
                    ></InputOption>
                )} */}
        </>
    );
}
