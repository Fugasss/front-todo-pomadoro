import { useContext } from "react";
import { TasksContext } from "./TasksContext";
import { Task } from "./Task";


export function TasksList() {
    const tasks = useContext(TasksContext);

    return (
        <ul>
            {tasks.map(t => (
            <li key={t.id}>
                <Task {...t} />
            </li>
            ))}
        </ul>
    );
}