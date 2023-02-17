interface IInputOption {
    placeholder: string;
    setValue: (value: any) => void;
    isActive: boolean;
    onFocus: () => void;
    currentValue: any;
}
import styles from "./Settings.module.css";

export function InputOption(props: IInputOption) {
    function handleKeyUp(event: any) {
        //key code for enter
        if (event.code === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    }

    return (
        <input
            type="number"
            className={
                "button " +
                styles.inputButton +
                " " +
                (props.isActive && styles.buttonActive)
            }
            placeholder={props.placeholder}
            onFocus={(e) => {
                // make current text into currentValue
                e.target.value = props.currentValue;
                onFocus();
            }}
            onChange={(e) => {
                if (e.target.value && e.target.value > 0)
                    setValue(e.target.value);
            }}
            onKeyUp={handleKeyUp}
            onBlur={(e) => (e.target.value = placeholder)}
            onWheel={(event) => event.currentTarget.blur()}
            autoFocus={false}
        ></input>
    );
}
