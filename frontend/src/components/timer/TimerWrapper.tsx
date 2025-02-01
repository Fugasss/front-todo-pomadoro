import { useEffect, useState } from 'react';
import Timer from "./Timer";
import styles from './Timer.module.scss';

type TimerWrapperProps = {
    initialTime: number,
    onComplete?: Function,
    onPause?: Function,
    onStop?: Function,
};

export default function TimerWrapper({initialTime, onComplete, onPause, onStop}: TimerWrapperProps) {
    const [time, setTime] = useState(initialTime);
    const [state, setState] = useState("STOPPED");
    
    const startTimer = () => {
        setState("RUNNING");
    };
    const pauseTimer = () => {
        setState("PAUSED");
    };
    const stopTimer = () => {
        setTime(initialTime);
        setState("STOPPED");
    };
    const skipTimer = () => {
        setTime(initialTime);
        setState("SKIPPED");
    };

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    const isRunning = state === "RUNNING";

    return (
        <div className={styles.wrapper}>
            <h2 style={{padding: 0, margin: 0, marginTop: 10}}>Timer</h2>

            <Timer
                time={time} 
                setTime={setTime} 
                state={state}
                setState={setState}
                onComplete={onComplete} 
                onPause={onPause} 
                onStop={onStop}
            />
            <div className={styles.controls}>
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                <button onClick={stopTimer}>Reset</button>
                <button onClick={skipTimer}>Skip</button>
            </div>
        </div>
    );
}