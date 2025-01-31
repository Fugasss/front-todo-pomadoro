import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { TaskActionType } from "./TasksReducer";
import './TaskAdd.scss';
import Cross from "../Cross";

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

    const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, pomodorosCount: +e.target.value});
    };

    if(showForm){
        return (
            <>
            <button onClick={()=>{setShowForm(false);}}>Create</button>
            <div className="modal">
                <div className="task-add-form modal">
                    <div>
                        <p style={{display: "inline"}}>Add Task</p>
                        <Cross width={48} height={48} onClick={()=>setShowForm(false)}/>
                    </div>
                    
                    <input type="text" placeholder="Title" onChange={changeTitle}/>
                    <input type="text" placeholder="Description" onChange={changeDescription}/>
                    <input type="number" min={1} placeholder="Pomodoros Count" onChange={changeCount}/>

                    <button onClick={()=>{addTask(); setShowForm(false);}}>Add</button>
                </div>
            </div>
            </>
        );      
    }

    return (
        <>
        <button onClick={()=>{setShowForm(true);}}>Create</button>
        </>
    );
}