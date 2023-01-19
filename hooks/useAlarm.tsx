import { useEffect, useState } from "react";
import useSound from "use-sound";
import PageLayout from "../components/PageLayout";
import { useAlarmStore } from "../stores/useAlarmStore";

//@ts-ignore
import defaultAlarm from "../public/sounds/gentle.mp3";

export const useAlarm = () => {
    const [alarmSoundName, _setAlarmSoundByName, volume] = useAlarmStore(
        (state) => [
            state.alarmSoundName,
            state.setAlarmSoundByName,
            state.volume,
        ]
    );

    const [alarm, setAlarm] = useState(defaultAlarm);
    useEffect(() => {
        import(`../public/sounds/${alarmSoundName}`).then((newAlarm) =>
            setAlarm(newAlarm)
        );
    }, [alarmSoundName]);

    const [play, { stop }] = useSound(alarm, { volume: 0.5 });
    return { play, stop };
};
