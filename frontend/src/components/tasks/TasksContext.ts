import { useReducer, createContext} from "react";
import { TaskProps } from "./Task";

export const TasksContext = createContext<TaskProps[]>([]);
export const TasksDispatchContext = createContext<Function>(() => {});