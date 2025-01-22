const tasks = [
    {
        id: 1, 
        name: "Wash monkey",
        isCompleted: true
    },
    {
        id: 2, 
        name: "Build rocket",
        isCompleted: false
    },
    {
        id: 3, 
        name: "Brrrrrr  brrr brrb brbrbrbrbr",
        isCompleted: false
    },
    {
        id: 4, 
        name: "AAAAAAAAAAAAAAAAAAAA",
        isCompleted: false
    },
    {
        id: 5, 
        name: "WHROOOOOOM WHROOOOOOM WHROOOOOOM WHROOOOOOM WHROOOOOOM",
        isCompleted: false
    },
]

export function loadTasks(){ 
    return tasks; 
}

export function saveTask(task){ 
    
    const existing_task_id = tasks.findIndex((v)=>v.id === task.id);
    
    if(existing_task_id !== -1){
        tasks[existing_task_id] = task;
        return tasks[existing_task_id];
    }

    tasks = [...tasks, task];
}

export function deleteTask(task_id){
    const found_id = tasks.findIndex((v)=>v.id === task_id);

    if(found_id !== -1){
        tasks = tasks.slice(0, found_id - 1) + tasks.slice(found_id + 1, tasks.length);
        return true;
    }

    return false;
}