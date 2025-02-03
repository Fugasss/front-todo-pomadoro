import React, { useContext, useState } from "react";
import { TasksContext, TasksDispatchContext } from "./TasksContext";
import { Task } from "./Task";
import styles from './TasksList.module.scss';
import { TaskAdd } from "./TaskAdd";
import { TaskActionType } from "./TasksReducer";
import { stringSimilarity } from "string-similarity-js";

enum TasksFilter {
    ALL = 'ALL',
    COMPLETED = 'COMPLETED',
    INCOMPLETE = 'INCOMPLETE',
};

export function TasksList() {
    const tasks = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

    const [filter, setFilter] = useState(TasksFilter.ALL);
    const [titleFilter, setTitleFilter] = useState('');
    
    const filteredTasks = tasks.filter(t=>{
        if(titleFilter === ''){
            return true;
        }

        const startsWith = t.title.toLowerCase().startsWith(titleFilter.toLowerCase());
        const similarityScore = stringSimilarity(t.title, titleFilter, 2, false);
        
        // console.log(`${t.title} is like ${titleFilter} for ${Math.floor(similarityScore * 100) }%`);
        
        if(startsWith || similarityScore >= 0.4){
            return t;
        }

        return false;
    }).filter(t => { 
        if(filter === TasksFilter.COMPLETED) 
            return t.pomodorosCompleted === t.pomodorosCount;
        else if(filter === TasksFilter.INCOMPLETE) 
            return t.pomodorosCompleted < t.pomodorosCount;
        
        return true;
    });

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFilter(e.target.value);
    };

    const clearTasksList = () => {
        dispatch({type: TaskActionType.CLEAR});
    };

    return (
        <div className={styles.wrapper}>
            <h2>Tasks</h2>
            <div className={styles.controls}>
                <TaskAdd/>
                <button onClick={clearTasksList}>Clear</button>
            </div>
            <div className={styles.filters}>
                <button disabled={filter===TasksFilter.ALL} onClick={() => setFilter(TasksFilter.ALL)}>All</button>
                <button disabled={filter===TasksFilter.COMPLETED} onClick={() => setFilter(TasksFilter.COMPLETED)}>Completed</button>
                <button disabled={filter===TasksFilter.INCOMPLETE} onClick={() => setFilter(TasksFilter.INCOMPLETE)}>Incomplete</button>
                <input placeholder="Title" onChange={handleTitleInputChange}/>
            </div>
           
            <ul className={styles.tasks}>
                {filteredTasks.map(t => (
                <li className={styles.task} key={t.id}>
                    <Task {...t} />
                </li>
                ))}
            </ul>
        </div>
    );
}