import { TaskProps } from "./Task";

export default interface TaskService {
    getTasks()                 : TaskProps[];
    createTask(task: TaskProps): TaskProps;
    updateTask(task: TaskProps): TaskProps;
    deleteTask(taskId: number) : boolean;
    clear(): void;
};


export class LocalTaskService implements TaskService{
  
    getTasks(): TaskProps[] {
        const tasks = this.loadTasks();

        return tasks;
        // return new Promise((resolve, reject) => { 
        //     resolve(tasks);
        // });

    }
    createTask(task: TaskProps):TaskProps {
        let tasks = this.loadTasks();

        const taskIndex = tasks.findIndex(t => t.id === task.id);

        if(taskIndex !== -1)
            tasks.splice(taskIndex, 1);

        tasks = [...tasks, task];

        this.saveTasks(tasks);
        
        return task;
    }
    updateTask(task: TaskProps):TaskProps {
        const tasks = this.loadTasks();
        const taskIndex = tasks.findIndex(t => t.id === task.id);

        if(taskIndex !== -1) {
            tasks[taskIndex] = task;
            this.saveTasks(tasks);
        }

        return task;
    }
    deleteTask(taskId: number): boolean {
        const tasks = this.loadTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if(taskIndex === -1) {
            return false;
        }

        tasks.splice(taskIndex, 1);
        this.saveTasks(tasks);

        return true;
    }

    clear(): void {
        this.saveTasks([]);
    }

    loadTasks(): TaskProps[] {
        const localStorageTasks = localStorage.getItem("tasks");
        const initialTasks: TaskProps[] = (localStorageTasks && localStorageTasks.length > 0 && JSON.parse(localStorageTasks, (k: string, v: string)=>{
            if(k === 'pomodorosCount' || k === 'pomodorosCompleted'){
              return +v;
            }
            return v;
        }));

        return initialTasks || [];
    }

    saveTasks(tasks: TaskProps[]) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    
}
