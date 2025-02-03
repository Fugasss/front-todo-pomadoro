import { useContext, useState } from 'react';
import { TaskActionType } from './TasksReducer';
import { TasksDispatchContext } from './TasksContext';
import styles from './Task.module.scss';
import Modal from '../modal/Modal';

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


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: TaskActionType.CHANGED, 
            id: id,
            title: e.target.value,
        });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: TaskActionType.CHANGED, 
            id: id,
            description:  e.target.value,
        });
    };

    const handlePomodorosCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: TaskActionType.CHANGED, 
            id: id,
            pomodorosCount: +e.target.value,
        });
    };

    const handleModalClose = () => {
        setUpdate(false);
    };

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

    if(update) {
        return (
            <>
            <h3>HAHAHA</h3>
            <h3>HAHAHA</h3>
            <h3>HAHAHA</h3>
            <h3>HAHAHA</h3>
            <Modal title='Update Task' onClose={handleModalClose}>
                <div className={styles.update}>
                    <label htmlFor='title'>Title</label>
                    <input name='title' type="text" value={title} onChange={handleTitleChange} />
                    
                    <label htmlFor='description'>Description</label>
                    <input name='description' type="text" value={description} onChange={handleDescriptionChange} />
                    
                    <label htmlFor='count'>Pomodoros</label>
                    <input name='count' type="number" min={1} value={pomodorosCount} onChange={handlePomodorosCountChange} />

                    <div className={styles.controls}>
                        <button onClick={handleModalClose}>Back</button>
                    </div>
                </div>

            </Modal>
            </>
        );
    }

    return (
        <>
        <div className={styles.wrapper}>
            <h3>{title}{completed ? '😎': '🤔'}</h3>
            <p>{description}</p>
            <p>Status: {completed ? 'Completed': 'In Progress'}</p>
            <div className={styles.controls}>
                <button onClick={handleCompleteButtonClick}>{completed? "Reset" : "Complete"}</button>
                <button onClick={()=> setUpdate(true)}>Edit</button>
                <button onClick={handleDeleteButtonClick}>Delete</button>
            </div>
            
        </div>
        </>

    );
}