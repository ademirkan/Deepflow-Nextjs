interface Props {
    variant: "contained" | "outlined" | "transparent";
    state?: "default" | "active" | "disabled";
    isFullWidth: boolean;
    size: "sm" | "med" | "lg";
    icon?: React.ReactNode;
    onClick?: () => void;
    children: string;
}

/**
 * variant -- contained-btn, outlined-btn, text-btn
 * state -- default-btn, active-btn, disabled-btn
 * size -- small-btn, medium-btn, large-btn
 */
export default function Button(props: Props) {
    const variant_class = `${props.variant}-btn`;
    const state_class = !props.state ? "default-btn" : `${props.state}-btn`;
    const full_width = props.isFullWidth ? "full-width" : "";
    const size_class = `btn-${props.size}`;

    if (props.icon) {
        return (
            <button
                className={`${variant_class} ${state_class} ${full_width} ${size_class}`}
            >
                {props.icon}
                {props.children}
            </button>
        );
    } else {
        return (
            <button
                className={`${variant_class} ${state_class} ${full_width} ${size_class}`}
            >
                {props.children}
            </button>
        );
    }
}
