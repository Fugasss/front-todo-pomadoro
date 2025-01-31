import { useContext, useState } from 'react';
import { TaskActionType } from './TasksReducer';
import { TasksDispatchContext } from './TasksContext';


export type TaskProps = {
    id: number,
    title: string,
    description: string,
    pomodorosCount: number,
    pomodorosCompleted: number, 
};


export function Task({id, title, description, pomodorosCount, pomodorosCompleted}: TaskProps) {
    const [update, setUpdate] = useState(false);
    const dispatch = useContext(TasksDispatchContext);

    const completed = pomodorosCompleted === pomodorosCount;

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

    if(update) {
        return (
            <>
                <input type="text" value={title} onChange={handleTitleChange} />
                <input type="text" value={description} onChange={handleDescriptionChange} />
                <input type="number" value={pomodorosCount} onChange={handlePomodorosCountChange} />
                <button onClick={() => setUpdate(false)}>Back</button>
            </>
        );
    }

    return (
        <>
        <h3>{title}{completed ? '😀': '🤔'}{pomodorosCompleted + 1}/{pomodorosCount}</h3>
        <p>{description}</p>
        <button onClick={()=> setUpdate(true)}>Edit</button>
        <button onClick={()=> dispatch({type: TaskActionType.DELETED, id: id})}>Delete</button>
        </>
    );
}