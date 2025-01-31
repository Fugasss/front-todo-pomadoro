import {  useContext, useReducer } from 'react'
import { tasksReducer} from './components/tasks/TasksReducer';
import { TasksDispatchContext, TasksContext, TaskServiceContext } from './components/tasks/TasksContext';
import { TasksList } from './components/tasks/TasksList';

import './App.scss'
import { PomodoroTimer } from './components/timer/PomodoroTimer';



export default function App() {
  const taskService = useContext(TaskServiceContext);
  const initialTasks =  taskService.getTasks();
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
  return (
    <>
      <TaskServiceContext.Provider value={taskService}>
        <TasksContext.Provider value={tasks}>
          <TasksDispatchContext.Provider value={dispatch}>
              <h1>ToDo List</h1>
              <PomodoroTimer/>
              <TasksList />
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      </TaskServiceContext.Provider>
    </>
  )
};