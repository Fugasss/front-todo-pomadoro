import { useEffect, useState } from 'react'
import './App.css'
import TimerWrapper from './timer/TimerWrapper'
import TaskList from './tasks/TaskList'
import Footer from './Footer'


function updateTask(task){
  console.log("Updating task on server: ", task);
  
  const data = {
      id: task.id,
      name: task.name,
      pomodoros: task.pomodorosCount,
      pomodoros_completed: task.pomodorosCompletedCount,
    };

  fetch('http://localhost:8080/api/tasks/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


export default function App() {
  const POMODORO_DURATION = 25 * 60;
  const SHORT_BREAK_DURATION = 5 * 60;
  const LONG_BREAK_DURATION = 15 * 60;

  const [id, setId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState(POMODORO_DURATION);
  const [taskState, setTaskState] = useState("POMODORO");

  useEffect(()=>{
    const loadTasks = async ()=>{
      const tasks = await fetch('http://localhost:8080/api/tasks');
      let data = await tasks.json();

      data = data.map((task, index)=>{
        return {
          id: task.id,
          name: task.name,
          pomodorosCount: task.pomodoros,
          pomodorosCompletedCount: task.pomodoros_completed,
        };
      });

      setTasks(data);
      setId(data.filter((task)=>task.pomodorosCompletedCount < task.pomodorosCount)[0].id - 1);
    }
    loadTasks();
  }, []);


  useEffect(()=>{
    if(id >= tasks.length) return;

    updateTask(tasks[id]);
  }, [tasks]);

  const timerCompleteHandler = ()=>{
    console.log(`Timer completed: ${tasks[id]?.pomodorosCompletedCount}/${ tasks[id]?.pomodorosCount}\nCurrent State: ${taskState}`);

    if (id >= tasks.length) return;

    if(taskState === "POMODORO"){

      if (tasks[id].pomodorosCompletedCount < tasks[id].pomodorosCount){
        
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[id].pomodorosCompletedCount++;

          return updatedTasks;
        });

        setTime(SHORT_BREAK_DURATION);
        // console.log(`NEXT IS SHORT BREAK: ${SHORT_BREAK_DURATION}`);
      } else{
        setTime(LONG_BREAK_DURATION);
        setId((prevId) => prevId + 1);
        // console.log(`NEXT IS LONG BREAK: ${LONG_BREAK_DURATION}`);
      }

      setTaskState("BREAK");

    } else if(taskState === "BREAK"){
      setTaskState("POMODORO");
      setTime(POMODORO_DURATION);
      // console.log(`NEXT IS POMODORO: ${POMODORO_DURATION}`);
    }
  };

  const timerStopHandler = ()=>{
    console.log(`Stop handler:${tasks[id]}`);
  };

  return (
    <>
        <h1>ToDo</h1>
        <TimerWrapper 
              initialTime={time}
              onStop={timerStopHandler} 
              onSkip={timerCompleteHandler}
              onComplete={timerCompleteHandler}
        />
        <h2>Pomodoro: {tasks[id]?.pomodorosCompletedCount}/{ tasks[id]?.pomodorosCount}</h2>
        <TaskList tasks={tasks}/>
        <Footer/>
    </>
  )
}
