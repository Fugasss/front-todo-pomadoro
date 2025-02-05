import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { TaskActionType } from "./TasksReducer";
import styles from './TasksList.module.scss';
import Modal from "../modal/Modal";

type TaskAddForm = {
    title: string,
    description: string,
    pomodorosCount: number
};

export function TaskAdd() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<TaskAddForm>({title: '', description: '', pomodorosCount: 0});
    const dispatch = useContext(TasksDispatchContext);

    const addTask = () => {
        dispatch({
            type: TaskActionType.ADDED, 
           ...form
        });
    };

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, title: e.target.value});
    };

    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, description: e.target.value});
    };

    // const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm({...form, pomodorosCount: +e.target.value});
    // };

    const addButtonClick = ()=>{
        addTask(); 
        setShowForm(false);
        setForm({title: '', description: '', pomodorosCount: 0});
    }

    return (
        <>
            <button onClick={()=>{setShowForm(true);}}>Create</button>
            {(showForm) ? <Modal title="Add Task" onClose={()=>setShowForm(false)}>
                <div className={styles.form}>
                    <input type="text" minLength={1} placeholder="Title" onChange={changeTitle}/>
                    <input type="text" minLength={1} placeholder="Description" onChange={changeDescription}/>
                    <input type="number" min={1} placeholder="Pomodoros Count" onChange={changeCount}/>

                    <button className={styles.add} onClick={addButtonClick}>Add</button>
                </div>
                </Modal> : null}
        </>
    );
}