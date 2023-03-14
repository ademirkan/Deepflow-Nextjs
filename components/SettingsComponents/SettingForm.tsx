import styles from "../../styles/Settings.module.css";

/**
 * Setting
 *    ButtonOptions
 *    Customizable: boolean
 *    Options: ButtonOption[]
 *    CurrentValue: any
 *    SetValue: (value: any) => void
 *    InputOption
 */
interface ISettingForm {
    title: string;
    description?: string;
    inputArea: any;
}

export default function SettingForm(props: ISettingForm) {
    if (props.description) {
        return (
            <div className={styles.settingLayout}>
                <div className={styles.detailsContainer}>
                    <label className={styles.title}>{props.title}</label>
                    <div className={styles.description}>
                        {props.description}
                    </div>
                </div>
                <div className={styles.optionsContainer}>{props.inputArea}</div>
            </div>
        );
    }

    return (
        <div className="">
            <label className={styles.title}>{props.title}</label>
            <div className={styles.optionsContainer}>{props.inputArea}</div>
        </div>
    );
}
