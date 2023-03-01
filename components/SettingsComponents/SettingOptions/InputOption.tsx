interface IInputOption {
    setValue: (value: any) => void;
    onFocus: () => void;
    currentValue: any;
    placeholder?: string;
}
import styles from "../../../styles/Settings.module.css";
import Button from "../../Buttons/Button";

export function InputOption(props: IInputOption) {
    function handleKeyUp(event: any) {
        //key code for enter
        if (event.code === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    }

    return (
        <>
            <input
                type="number"
                className={`${styles.inputOption} ${
                    !props.placeholder && "placeholder-text"
                } `}
                placeholder={props.placeholder || props.currentValue}
                onFocus={(e) => {
                    // make current text into currentValue
                    e.target.value = props.currentValue;
                    props.onFocus();
                }}
                onChange={(e) => {
                    if (e.target.value && parseInt(e.target.value) > 0)
                        props.setValue(e.target.value);
                }}
                onKeyUp={handleKeyUp}
                onBlur={(e) =>
                    (e.target.value = props.placeholder || props.currentValue)
                }
                onWheel={(event) => event.currentTarget.blur()}
                autoFocus={false}
            ></input>
            <Button>
                <i className="fa-solid fa-floppy-disk"></i>
            </Button>
        </>
    );
}
