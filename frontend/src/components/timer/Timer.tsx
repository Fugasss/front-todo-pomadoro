import { Component } from "react";
import styles from "./Timer.module.scss";

export type TimerProps = {
    time: number;
    setTime: (time: number | ((prevTime: number) => number)) => void;
    state: "RUNNING" | "PAUSED" | "STOPPED" | "SKIPPED";
    setState: (state: "RUNNING" | "PAUSED" | "STOPPED" | "SKIPPED") => void;
    onComplete?: () => void;
    onPause?: () => void;
    onStop?: () => void;
}

class Timer extends Component<TimerProps> {
    private timer: number | null = null;

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate(prevProps: TimerProps) {
        if (prevProps.state !== this.props.state || prevProps.time !== this.props.time) {
            this.startTimer();
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    startTimer() {
        this.clearTimer();

        const { state, time, setTime, setState, onComplete, onPause, onStop } = this.props;

        if (state === "RUNNING" && time > 0) {
            this.timer = window.setInterval(() => {
                setTime((prevTime: number) => prevTime - 1);
            }, 1000);
        } else if (state === "STOPPED") {
            onStop?.();
        } else if (state === "PAUSED") {
            onPause?.();
        }

        if ((state === "RUNNING" && time <= 0) || state === "SKIPPED") {
            setState("STOPPED");
            onComplete?.();
        }
    }

    clearTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    render() {
        const { time } = this.props;

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const minutesFormat = minutes.toString().padStart(2, "0");
        const secondsFormat = seconds.toString().padStart(2, "0");
        const timeFormat = `${minutesFormat}:${secondsFormat}`;

        return <div className={styles.timer}>{timeFormat}</div>;
    }
}

export default Timer;
