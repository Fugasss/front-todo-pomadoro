import { TaskProps } from './Task';

export enum TaskActionType {
    ADDED = 'added',
    CHANGED = 'changed',
    DELETED = 'deleted',
};


export type TaskAction = {
    type: TaskActionType,
    id?: number,
    title?: string,
    description?: string,
    pomodorosCount?: number,
    pomodorosCompleted?: number
};
  
  
export function tasksReducer(tasks: TaskProps[], action: TaskAction) {
    console.log('tasksReducer', tasks, action);
    
    switch (action.type) {
      case TaskActionType.ADDED: {
        const newTasks = [...tasks, {
          id: action.id || tasks.length + 1,
          title: action.title || 'NO TITLE WERE PROVIDED',
          description: action.description || 'NO DESCRIPTION WERE PROVIDED',
          pomodorosCount: action.pomodorosCount || 1,
          pomodorosCompleted: 0
      }];
      
        localStorage.setItem("tasks", JSON.stringify(newTasks));

        return newTasks;
      }
      case TaskActionType.CHANGED: {
        
        const updatedTasks = tasks.map(t => {
          if (t.id === action?.id) {
            
            const updatedTask = {
              ...t,
              title: action.title || t.title,
              description: action.description || t.description,
              pomodorosCount: action.pomodorosCount || t.pomodorosCount,
              pomodorosCompleted: action.pomodorosCompleted || t.pomodorosCompleted
            };


            return updatedTask;
          }else{
            return t;
          }
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      console.log(`updatedTasks ${updatedTasks}` );


        return updatedTasks;
      }
      case TaskActionType.DELETED: {
        const newTasks = tasks.filter(t => t.id !== action.id);

        localStorage.setItem("tasks", JSON.stringify(newTasks));

        return newTasks;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
};
