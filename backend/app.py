from fastapi import FastAPI, status
from tasks import Task, TaskManager, InMemoryTaskManager
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


task_manager: TaskManager = InMemoryTaskManager()

print("Tasks: " + ",".join(["[" +str(task) +"]" for task in task_manager.get_tasks() ]))

@app.get("/api/tasks/", status_code=status.HTTP_200_OK)
def get_tasks():
    return task_manager.get_tasks()

@app.post("/api/tasks/", status_code=status.HTTP_201_CREATED)
def create_task(new_task: Task):
    print("Creating task:", new_task)
    return task_manager.create_task(new_task)

@app.put("/api/tasks/", status_code=status.HTTP_200_OK)
def update_task(task: Task):
    print("Updating task:", task)
    return task_manager.update_task(task)

@app.delete("/api/tasks/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(task_id: int):
    task_manager.delete_task(task_id)