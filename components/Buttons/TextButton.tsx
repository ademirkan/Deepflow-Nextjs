import styles from "../../styles/Buttons.module.css";

interface Props {
    isActive?: boolean;
    size?: "sm" | "med" | "lg";
    icon?: React.ReactNode;
    onClick?: () => void;
    children?: string;
}

export default function TextButton(props: Props) {
    return (
        <span
            className={`${styles.textBtn} ${props.isActive && styles.active} ${
                props.size ? styles[props.size] : styles.sm
            }`}
            onClick={props.onClick ? props.onClick : () => {}}
        >
            {props.icon && props.icon}
            {props.children}
        </span>
    );
}
