import {  useReducer } from 'react'
import './App.css'
import { tasksReducer} from './components/tasks/TasksReducer';
import { TaskProps } from './components/tasks/Task';
import { TasksDispatchContext, TasksContext } from './components/tasks/TasksContext';
import { TasksList } from './components/tasks/TasksList';
import { TaskAdd } from './components/tasks/TaskAdd';

  
const initialTasks: TaskProps[] = [
  { id: 1, title: 'Task 1', description: 'This is Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'This is Task 2', completed: false },
  { id: 3, title: 'Task 3', description: 'This is Task 3', completed: false },
];

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
 
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          <h1>Tasks</h1>
          <TaskAdd/>
          <TasksList/>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  )
};

