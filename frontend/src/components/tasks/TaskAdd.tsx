import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { TaskActionType } from "./TasksReducer";

type TaskAddForm = {
    title: string,
    description: string,
};

export function TaskAdd() {
    const [form, setForm] = useState<TaskAddForm>({title: '', description: ''});
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

    return (
        <div>
            <h3>Add Task</h3>
            <input type="text" placeholder="Title" onChange={changeTitle}/>
            <input type="text" placeholder="Description" onChange={changeDescription}/>
            <button onClick={addTask}>Add</button>
        </div>
    );
}