interface IInputOption {
    placeholder: string;
    setValue: (value: any) => void;
    isActive: boolean;
    onFocus: () => void;
    currentValue: any;
}
import styles from "../../../styles/Settings.module.css";

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
            className={`${styles.inputOption} ${
                props.isActive && styles.buttonActive
            }`}
            placeholder={props.placeholder}
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
            onBlur={(e) => (e.target.value = props.placeholder)}
            onWheel={(event) => event.currentTarget.blur()}
            autoFocus={false}
        ></input>
    );
}
