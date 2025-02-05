import {  useContext, useEffect, useReducer, useState } from 'react'
import { tasksReducer} from './components/tasks/TasksReducer';
import { TasksDispatchContext, TasksContext, TaskServiceContext } from './components/tasks/TasksContext';
import { TasksList } from './components/tasks/TasksList';

import './App.scss'
import { PomodoroTimer } from './components/timer/PomodoroTimer';
import Overlay, { Position } from './components/overlay/Overlay';

type Theme = 'light'|'dark';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(()=>{
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = ()=>setTheme( theme === 'light' ? 'dark' : 'light');

  const getThemeIconUrl = () => {
    return theme === 'dark' ? '/images/icon-moon.svg' : '/images/icon-sun.svg';
  };

  const taskService = useContext(TaskServiceContext);
  const initialTasks =  taskService.getTasks();
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
  return (
    <>
      <TaskServiceContext.Provider value={taskService}>
        <TasksContext.Provider value={tasks}>
          <TasksDispatchContext.Provider value={dispatch}>
              <h1>ToDo List</h1>
              
              <Overlay position={Position.TopLeft}>
                <img  src={getThemeIconUrl()} width={48} onClick={toggleTheme}/>
              </Overlay>
              
              <PomodoroTimer/>
              <TasksList />
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      </TaskServiceContext.Provider>
    </>
  )
};