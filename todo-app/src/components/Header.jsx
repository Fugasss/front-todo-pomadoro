import TimerWrapper from './timer/TimerWrapper';

export default function Header({timerCompleteHandler}){

    return (
        <>
            <h1>ToDo</h1>
            <TimerWrapper 
                initialTime={5}
                onStop={()=>{console.log("STOP")}} 
                onPause={()=>{console.log("PAUSE")}} 
                onReset={()=>{console.log("RESET")}} 
                onComplete={timerCompleteHandler}
            />
            
        </>
    );
}
