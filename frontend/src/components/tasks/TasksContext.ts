import { createContext} from "react";
import { TaskProps } from "./Task";
import TaskService, { LocalTaskService } from "./TaskService";

export const DefaultTaskService = new LocalTaskService();

export const TasksContext = createContext<TaskProps[]>([]);
export const TasksDispatchContext = createContext<Function>(() => {});
export const TaskServiceContext = createContext<TaskService>(DefaultTaskService);