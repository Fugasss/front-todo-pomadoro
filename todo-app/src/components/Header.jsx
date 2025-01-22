import Timer from './timer/Timer';

export default function Header({completeHandler}){


    return (
        <>
            <h1>ToDo</h1>
            <Timer completeHandler={completeHandler}/>
            
        </>
    );
}
