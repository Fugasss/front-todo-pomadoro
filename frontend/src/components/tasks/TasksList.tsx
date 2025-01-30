import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
import { Task } from "./Task";
import './TasksList.scss';

enum TasksFilter {
    ALL = 'ALL',
    COMPLETED = 'COMPLETED',
    INCOMPLETE = 'INCOMPLETE',
};

export function TasksList() {
    const tasks = useContext(TasksContext);

    const [filter, setFilter] = useState(TasksFilter.ALL);

    const filteredTasks = tasks.filter(t => { 
        if(filter === TasksFilter.COMPLETED) 
            return t.pomodorosCompleted + 1 === t.pomodorosCount;
        else if(filter === TasksFilter.INCOMPLETE) 
            return t.pomodorosCompleted + 1 < t.pomodorosCount;
        
        return true;
    });

    return (
        <>
            <div className="filter">
                <button disabled={filter===TasksFilter.ALL} onClick={() => setFilter(TasksFilter.ALL)}>All</button>
                <button disabled={filter===TasksFilter.COMPLETED} onClick={() => setFilter(TasksFilter.COMPLETED)}>Completed</button>
                <button disabled={filter===TasksFilter.INCOMPLETE} onClick={() => setFilter(TasksFilter.INCOMPLETE)}>Incomplete</button>
            </div>
            <ul className="tasks">
                {filteredTasks.map(t => (
                <li key={t.id}>
                    <Task {...t} />
                </li>
                ))}
            </ul>
        </>
    );
}