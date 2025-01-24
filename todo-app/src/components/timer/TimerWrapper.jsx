import { useState } from 'react';
import Timer from "./Timer";

export default function TimerWrapper({initialTime ,onComplete = null, onPause = null, onStop = null}) {
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

    const isRunning = state === "RUNNING";

    return (
        <>
            <Timer 
                time={time} 
                setTime={setTime} 
                state={state}
                setState={setState}
                onComplete={onComplete} 
                onPause={onPause} 
                onStop={onStop} 
            />
            <div>
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                <button onClick={stopTimer}>Reset</button>
            </div>
        </>
    );
}