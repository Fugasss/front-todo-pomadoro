import React, { useState, useEffect } from 'react';


export default function Timer({time, setTime, state, setState, onComplete = null, onPause = null, onStop = null}) {


    useEffect(() => {
        let timer;
        if (state==="RUNNING" && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if(state==="STOPPED"){
            clearInterval(timer);
            onStop && onStop();
        } else if(state==="PAUSED"){
            clearInterval(timer);
            onPause && onPause();
        }

        if (state==="RUNNING" && time <= 0) {
            setState("STOPPED");
            onComplete && onComplete();
        }

        return () => clearInterval(timer);
    }, [state, time]);


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <span className="timer">{(Math.floor(time / 60) < 10) ? "0" : ""}{Math.floor(time / 60)}:{(time % 60 < 10) ? "0" : ""}{time % 60}</span>
        </div>
    );
}


// const Timer = ({onComplete = null, onStart = null, onPause = null, onReset = null}) => {
//   const [time, setTime] = useState(60); // Время в секундах
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let timer;
//     if (isRunning && time > 0) {
//       timer = setInterval(() => {
//         setTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       clearInterval(timer);
//     }

//     if (time === 0) {
//         onComplete && onComplete();
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, time]);

//   const startTimer = () => {setIsRunning(true); onStart && onStart();};
//   const pauseTimer = () => {setIsRunning(false); onPause && onPause();};
//   const resetTimer = () => {
//     setIsRunning(false);
//     setTime(60);
//     onReset && onReset();
//   };
//   const updateTime = (e) => {
//     const newTime = parseInt(e.target.value, 10);
//     if (!isNaN(newTime) && newTime >= 0) {
//       setTime(newTime);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <span className="timer">{(Math.floor(time / 60) < 10) ? "0" : ""}{Math.floor(time / 60)}:{(time % 60 < 10) ? "0" : ""}{time % 60}</span>
//       <div>
//         <button onClick={startTimer} disabled={isRunning}>Start</button>
//         <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
//         <button onClick={resetTimer}>Reset</button>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         {/* <label htmlFor="timeInput">Set time (seconds): </label>
//         <input
//           id="timeInput"
//           type="number"
//           value={time}
//           onChange={updateTime}
//           disabled={isRunning}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Timer;

// // import { useEffect, useState } from "react";
// import Countdown from 'react-countdown';

// import './Timer.css';

// export default function Timer({completeHandler}) {
//     const renderer = ({ hours, minutes, seconds, completed }) => {
//         return <span className="timer">{(minutes < 10) ? "0" : ""}{minutes}:{(seconds < 10) ? "0" : ""}{seconds}</span>;
//     };
        
//     let countdown = null;
//     let api = null;

//     function setRef(cd){
//         if(cd){
//             countdown = cd;
//         }

//         api = countdown.getApi();
        
//     }

//     let timerComponent = <Countdown 
//         autoStart={false} 
//         date={Date.now() + 3000} 
//         renderer={renderer} 
//         ref={setRef} 
//         onComplete={() =>
//             {
//                 completeHandler(true);
//                 console.log("COMPLETE");
//             }
//         }
//     />

//     return (
//     <>
//     <div className={"timer-wrapper"}>
//         {timerComponent}
//         <button onClick={(e)=>{api.start()}}>Start</button>
//         <button onClick={(e)=>{api.pause()}}>Pause</button>
//         <button onClick={(e)=>{api.stop()}}>Stop</button>
//     </div>      
//     </>);
// }

// export default function Timer({initial_time}) {
    
//     const [time, setTime] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(0);
    
//     function update_time(){ 
//         setMinutes(Math.floor(time / 60));
//         setSeconds(time % 60);
//         setTime(time - 1);
    
//     }

//     setTime(initial_time);

//     useEffect(()=>{
//         const interval = setInterval(()=>update_time(), 1000);
        
//         // console.log(time);

//         if(time === 0){
//             clearInterval(interval);
//         }

//         return ()=>clearInterval(interval);
//     });
    
//     return (
//         <>
//             <h2 className="timer">{`Remaing time: ${(minutes < 10) ? "0" : ""}${minutes}:${(seconds < 10) ? "0" : ""}${seconds}`}</h2>
//         </>
//     );
// }