// import { useEffect, useState } from "react";
import Countdown from 'react-countdown';

import './Timer.css';

export default function Timer({completeHandler}) {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        return <span className="timer">{(minutes < 10) ? "0" : ""}{minutes}:{(seconds < 10) ? "0" : ""}{seconds}</span>;
    };
        
    let countdown = null;
    let api = null;

    function setRef(cd){
        if(cd){
            countdown = cd;
        }

        api = countdown.getApi();
    }

    return (
    <>
    <div className={"timer-wrapper"}>
        <Countdown 
            autoStart={false} 
            date={Date.now() + 3000} 
            renderer={renderer} 
            ref={setRef} 
            onComplete={() =>
                {
                    completeHandler(true);
                    console.log("COMPLETE");
                }
            }
        />
        <button onClick={(e)=>{api.start()}}>Start</button>
        <button onClick={(e)=>{api.pause()}}>Pause</button>
        <button onClick={(e)=>{api.stop()}}>Stop</button>
    </div>      
    </>);
}


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