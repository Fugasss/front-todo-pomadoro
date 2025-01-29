import { useContext } from "react";
import { TasksContext } from "./TasksContext";
import { Task } from "./Task";
import './TasksList.scss';


export function TasksList() {
    const tasks = useContext(TasksContext);

    return (
        <ul className="tasks">
            {tasks.map(t => (
            <li key={t.id}>
                <Task {...t} />
            </li>
            ))}
        </ul>
    );
}