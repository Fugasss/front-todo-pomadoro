import { useContext, useState } from 'react';
import './Task.css';
import { TaskActionType } from './TasksReducer';
import { TasksDispatchContext } from './TasksContext';

export type TaskProps = {
    id: number,
    title: string,
    description: string,
    completed: boolean,
};


export function Task({id, title, description, completed}: TaskProps) {
    const [update, setUpdate] = useState(false);
    const dispatch = useContext(TasksDispatchContext);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: TaskActionType.CHANGED, task: {id, title, description, completed}, title: e.target.value});
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: TaskActionType.CHANGED, task: {id, title, description, completed}, description: e.target.value});
    };

    if(update) {
        return (
            <div className="task">
                <input type="text" value={title} onChange={handleTitleChange} />
                <input type="text" value={description} onChange={handleDescriptionChange} />
                <button onClick={() => setUpdate(false)}>Back</button>
            </div>
        );
    }

    return (
        <div className="task">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=> setUpdate(true)}>Edit</button>
            <button onClick={()=> dispatch({type: TaskActionType.DELETED, id: id})}>Delete</button>

        </div>
    );
}