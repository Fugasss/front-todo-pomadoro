import { useEffect } from 'react';
import styles from './Timer.module.scss';


type TimerProps = {
    time: number,
    setTime: Function,
    state: string,
    setState: Function,
    onComplete?: Function,
    onPause?: Function,
    onStop?: Function,
};


export default function Timer({time, setTime, state, setState, onComplete, onPause, onStop}: TimerProps) {

    useEffect(() => {
        let timer: number;
        if (state==="RUNNING" && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime: number) => prevTime - 1);
            }, 1000);
        } else if(state==="STOPPED"){
            onStop && onStop();
        } else if(state==="PAUSED"){
            onPause && onPause();
        }

        if (state==="RUNNING" && time <= 0 || state==="SKIPPED") {
            setState("STOPPED");
            onComplete && onComplete();
        }

        return () => clearInterval(timer);
    }, [state, time]);

    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    const minutesFormat: string = ((minutes < 10) ? "0" : "") + minutes;
    const secondsFormat: string = ((seconds < 10) ? "0" : "") + seconds;

    const timeFormat: string =`${minutesFormat}:${secondsFormat}`;

    return (
        <div className={styles.timer}>{timeFormat}</div>
    );
}