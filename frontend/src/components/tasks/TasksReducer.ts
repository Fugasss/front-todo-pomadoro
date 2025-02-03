import { TaskProps } from './Task';
import { DefaultTaskService } from './TasksContext';

export enum TaskActionType {
    ADDED = 'added',
    CHANGED = 'changed',
    DELETED = 'deleted',
    CLEAR = 'clear'
};


export type TaskAction = {
    type: TaskActionType,
    id?: number,
    title?: string,
    description?: string,
    pomodorosCount?: number,
    pomodorosCompleted?: number,
    completed?: boolean
};


  
export function tasksReducer(tasks: TaskProps[], action: TaskAction) {
    const taskService = DefaultTaskService;

    switch (action.type) {
      case TaskActionType.ADDED: {
      
        const newTask = taskService.createTask({
          id: action.id || (tasks.length > 0 && tasks[tasks.length - 1].id + 1) || 1,
          title: action.title || 'NO TITLE WAS PROVIDED',
          description: action.description || 'NO DESCRIPTION WAS PROVIDED',
          pomodorosCount: action.pomodorosCount || 1,
          pomodorosCompleted: 0,
          completed: false
        });

        const newTasks = [...tasks, newTask];

        return newTasks;
      }
      case TaskActionType.CHANGED: {
        
        const updatedTasks = tasks.map(t => {
          if (t.id === action?.id) {
            
            const updatedTask = taskService.updateTask({
              id: action.id || t.id,
              title: action.title || t.title,
              description: action.description || t.description,
              pomodorosCount: action.pomodorosCount || t.pomodorosCount,
              pomodorosCompleted: action.pomodorosCompleted || t.pomodorosCompleted,
              completed: (action.completed !== undefined ? action.completed : t.completed)
            });

            return updatedTask;
          }else{
            return t;
          }
        });

        return updatedTasks;
      }
      case TaskActionType.DELETED: {
        
        taskService.deleteTask(action.id || 0);

        const newTasks = tasks.filter(t => t.id !== action.id);

        return newTasks;
      }
      case TaskActionType.CLEAR: {
        
        taskService.clear();

        return [];
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
};
