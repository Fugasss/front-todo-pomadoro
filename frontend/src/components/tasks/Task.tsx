import { useContext, useState } from 'react';
import { TaskActionType } from './TasksReducer';
import { TasksDispatchContext } from './TasksContext';
import styles from './Task.module.scss';
import Modal from '../modal/Modal';
import TaskStatus from './TaskStatus';
import TaskUpdate from './TaskUpdate';

export type TaskProps = {
    id: number,
    title: string,
    description: string,
    pomodorosCount: number,
    pomodorosCompleted: number, 
    completed: boolean
};


export function Task({id, title, description, pomodorosCount, pomodorosCompleted, completed}: TaskProps) {
    const [update, setUpdate] = useState(false);
    const dispatch = useContext(TasksDispatchContext);


    const handleCompleteButtonClick = () => {
        dispatch({
            type: TaskActionType.CHANGED, 
            id: id, 
            completed: !completed
        });
    };

    const handleDeleteButtonClick = ()=> {
        dispatch({
            type: TaskActionType.DELETED, 
            id: id
        });
    };

    const handleModalClose = () => {
        setUpdate(false);
    };

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>{title}</p>
                <TaskStatus completed={completed}/>
            </div>
            
            <p className={styles.description}>{description}</p>
            <div className={styles.controls}>
                <button onClick={handleCompleteButtonClick}>{completed? "Reset" : "Complete"}</button>
                <button onClick={()=> setUpdate(true)}>Edit</button>
                <button onClick={handleDeleteButtonClick}>Delete</button>
            </div>
            
        </div>
        {(update ?
            <TaskUpdate id={id} title={title} description={description} onModalClose={handleModalClose}/> : null)}
        </>
    );
}