import { ReactElement } from "react";

interface Props {
    variant?: "contained" | "outlined" | "transparent";
    state?: "default" | "active" | "disabled";
    isFullWidth?: boolean;
    size?: "sm" | "med" | "lg";
    onClick?: () => void;
    children: any;
}

/**
 * variant -- contained-btn, outlined-btn, text-btn
 * state -- default-btn, active-btn, disabled-btn
 * size -- small-btn, medium-btn, large-btn
 */
export default function Button(props: Props) {
    const variant_class = !props.variant
        ? "contained-btn"
        : `${props.variant}-btn`;
    const state_class = !props.state ? "default-btn" : `${props.state}-btn`;
    const full_width_class = props.isFullWidth ? "w-full" : "";
    const size_class = props.size ? `btn-${props.size}` : "btn-med";

    return (
        <button
            className={`${variant_class} ${state_class} ${full_width_class} ${size_class}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
