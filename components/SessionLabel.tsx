interface Props {
    label: string;
}
import styles from "../styles/SessionLabel.module.css";
export function SessionLabel({ label }: Props) {
    return (
        <div
            className="flex justify-center items-center"
            style={{ gridArea: "label" }}
        >
            <span className={styles.timerLabel}>{label}</span>
        </div>
    );
}
