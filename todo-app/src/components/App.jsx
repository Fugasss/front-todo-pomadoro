import { useState } from 'react'
import './App.css'
import TaskList from './tasks/TaskList'
import Header from './Header'
import Footer from './Footer'

import {loadTasks} from './tasks/TaskManager'

export default function App() {

  const initial_tasks = loadTasks();

  const [id, setId] = useState(initial_tasks.findIndex((v)=>v.isCompleted===false));

  const [tasks, setTasks] = useState(initial_tasks);
  
  return (
    <>
      <Header completeHandler = 
      {
        ()=>{
          tasks[id].isCompleted = true;
          setTasks(tasks);
          setId(id + 1);
        }
        
      }/>
      <TaskList tasks={tasks}/>
      <Footer/>
    </>
  )
}
