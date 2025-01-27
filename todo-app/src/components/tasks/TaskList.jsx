import Task from "./Task";

import './TaskList.css';

export default function TaskList({tasks}) {
    return (
        <>
            {tasks.map((val, i)=>{
                return <Task key={i} {...val}/>
            })}
        </>
    );
}