interface Props {
    variant: "contained" | "outlined" | "text";
    state: "default" | "active" | "disabled";
    isFullWidth: boolean;
    size: "s" | "m" | "l";
    icon?: React.ReactNode;
    children: string;
}

export default function IconButton(props: Props) {
    return <button>{props.children}</button>;
}
