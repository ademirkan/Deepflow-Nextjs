import styles from "./Settings.module.css";

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
    description: string;
    actionArea: any;
}

export default function SettingForm(props: ISettingForm) {
    return (
        <form className={styles.settingGrid}>
            <div className="w-[60%]">
                <label className={styles.title}>{props.title}</label>
                <div className={styles.description}>{props.description}</div>
            </div>
            <div className={styles.optionListContainer}>{props.actionArea}</div>
        </form>
    );
}
