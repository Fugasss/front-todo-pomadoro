import { useContext } from 'react';
import Modal from '../modal/Modal';
import styles from './Task.module.scss';
import { TasksDispatchContext } from './TasksContext';
import { TaskActionType } from './TasksReducer';

type TaskUpdateProps = {
    id: number,
    title: string,
    description: string,
    onModalClose: Function
};

export default function TaskUpdate({id, title, description, onModalClose}: TaskUpdateProps) {
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

    return (
        <Modal title='Update Task' onClose={onModalClose}>
            <div className={styles.update}>
                <label htmlFor='title'>Title</label>
                <input name='title' type="text" value={title} onChange={handleTitleChange} />
                
                <label htmlFor='description'>Description</label>
                <input name='description' type="text" value={description} onChange={handleDescriptionChange} />
            {/*                 
                <label htmlFor='count'>Pomodoros</label>
                <input name='count' type="number" min={1} value={pomodorosCount} onChange={handlePomodorosCountChange} /> */}

                <div className={styles.controls}>
                    <button onClick={()=>onModalClose()}>Back</button>
                </div>
            </div>

        </Modal>
        );

}