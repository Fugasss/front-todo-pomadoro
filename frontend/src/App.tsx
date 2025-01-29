import {  useContext, useReducer, useState } from 'react'
import { tasksReducer} from './components/tasks/TasksReducer';
import { TaskProps } from './components/tasks/Task';
import { TasksDispatchContext, TasksContext } from './components/tasks/TasksContext';
import { TasksList } from './components/tasks/TasksList';
import { TaskAdd } from './components/tasks/TaskAdd';

import './App.scss'
import { PomodoroTimer } from './components/timer/PomodoroTimer';


  
const initialTasks: TaskProps[] = [
  { id: 1, title: 'Task 1', description: 'This is Task 1', pomodorosCount: 4, pomodorosCompleted: 0 },
  { id: 2, title: 'Task 2', description: 'This is Task 2', pomodorosCount: 4, pomodorosCompleted: 0 },
  { id: 3, title: 'Task 3', description: 'This is Task 3', pomodorosCount: 4, pomodorosCompleted: 0 },
];

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
 
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          <h1>Tasks</h1>
          <PomodoroTimer/>
          <TaskAdd/>
          <TasksList/>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  )
};
