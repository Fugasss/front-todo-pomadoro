import { useContext, useState } from "react";
import { TasksContext, TasksDispatchContext } from "../tasks/TasksContext";
import TimerWrapper from "./TimerWrapper";
import { TaskActionType } from "../tasks/TasksReducer";

export function PomodoroTimer(){
    const POMODORO_DURATION = 25 * 60;
    const SHORT_BREAK_DURATION = 5 * 60;
    const LONG_BREAK_DURATION = 15 * 60;

    const [id, setId] = useState(0);
    const [taskState, setTaskState] = useState('POMODORO');
    const [time, setTime] = useState(POMODORO_DURATION);
    const tasks = useContext(TasksContext);
    const dispatchTask = useContext(TasksDispatchContext);
  
    const timerCompleteHandler = ()=>{
      // console.log(`Timer completed: ${tasks[id]?.pomodorosCompleted}/${ tasks[id]?.pomodorosCount}\nCurrent State: ${taskState}`);
  
      if (id >= tasks.length) return;
  
      if(taskState === "POMODORO"){
  
        if (tasks[id].pomodorosCompleted + 1 < tasks[id].pomodorosCount){
            dispatchTask({
                type: TaskActionType.CHANGED,
                id: tasks[id].id,
                pomodorosCompleted: tasks[id].pomodorosCompleted + 1,
            });
  
          setTime(SHORT_BREAK_DURATION);
        } else{
          setTime(LONG_BREAK_DURATION);
          setId((prevId) => prevId + 1);
        }
  
        setTaskState("BREAK");
  
      } else if(taskState === "BREAK"){
        setTaskState("POMODORO");
        setTime(POMODORO_DURATION);
      }
    };

    return (
        <TimerWrapper
            initialTime={time}
            onComplete={timerCompleteHandler}
        />
    );
}