import styles from "./Settings.module.css";
import { ReactElement, useState } from "react";

/**
 * Setting
 *    CustomizableButtonOptionList
 *    ButtonOptionList
 *    InputOption
 */
interface ISettingComponentProps {
    title: string;
    description: string;
    actionArea: any;
}

export default function SettingComponent(props: ISettingComponentProps) {
    return (
        <div className={styles.settingGrid}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.optionListContainer}>{props.actionArea}</div>
        </div>
    );
}
