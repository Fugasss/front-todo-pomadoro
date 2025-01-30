import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { TaskActionType } from "./TasksReducer";
import './TaskAdd.scss';


type TaskAddForm = {
    title: string,
    description: string,
    pomodorosCount: number
};

export function TaskAdd() {
    const [form, setForm] = useState<TaskAddForm>({title: '', description: '', pomodorosCount: 0});
    const dispatch = useContext(TasksDispatchContext);

    const addTask = () => {
        dispatch({type: TaskActionType.ADDED, title: form.title, description: form.description, completed: false});
    };

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, title: e.target.value});
    };

    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, description: e.target.value});
    };

    const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, pomodorosCount: +e.target.value});
    };

    return (
        <div className="task-add-form">
            <p>Add Task</p>
            <input type="text" placeholder="Title" onChange={changeTitle}/>
            <input type="text" placeholder="Description" onChange={changeDescription}/>
            <input type="number" min={1} placeholder="Pomodoros Count" onChange={changeCount}/>

            <button onClick={addTask}>Add</button>
        </div>
    );
}