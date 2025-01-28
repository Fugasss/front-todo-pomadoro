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
    completed?: boolean,
};
  
  
export function tasksReducer(tasks: TaskProps[], action: TaskAction) {
    console.log('tasksReducer', tasks, action);
    
    switch (action.type) {
      case TaskActionType.ADDED: {
        return [...tasks, {
            id: action.id || tasks.length + 1,
            title: action.title || 'NO TITLE WERE PROVIDED',
            description: action.description || 'NO DESCRIPTION WERE PROVIDED',
            completed: false
        }];
      }
      case TaskActionType.CHANGED: {
        return tasks.map(t => {
          if (t.id === action?.id) {
            return t;
          }else{
            return {
              ...t,
              title: action.title || t.title,
              description: action.description || t.description,
              completed: action.completed || t.completed
            };
          }
        });
      }
      case TaskActionType.DELETED: {
        return tasks.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
};
