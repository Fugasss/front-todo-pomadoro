from abc import ABC, abstractmethod
from pydantic import BaseModel

class Task(BaseModel):
    id : int
    name: str
    pomodoros: int
    pomodoros_completed: int = 0


class TaskManager(ABC):
    @abstractmethod
    def get_tasks(self) -> list[Task]:
        pass
    
    def get_task(self, task_id: int) -> Task:
        pass

    @abstractmethod
    def create_task(self, new_task: Task) -> Task:
        pass

    @abstractmethod
    def update_task(self, task: Task) -> Task:
        pass

    @abstractmethod
    def delete_task(self, task_id: int) -> bool:
        pass


class InMemoryTaskManager(TaskManager):
    def __init__(self):
        self.tasks = [
            Task(id=1, name="task 1", pomodoros=2, pomodoros_completed=1),
            Task(id=2, name="task 2", pomodoros=4, pomodoros_completed=0),
            Task(id=3, name="task 3", pomodoros=3, pomodoros_completed=0),
            Task(id=4, name="task 4", pomodoros=2, pomodoros_completed=0),
            Task(id=5, name="task 5", pomodoros=3, pomodoros_completed=0),
            Task(id=6, name="task 6", pomodoros=4, pomodoros_completed=0),
            Task(id=7, name="task 7", pomodoros=5, pomodoros_completed=0),

        ]
    
    def get_tasks(self) -> list[Task]:
        return self.tasks
    
    def get_task(self, task_id: int) -> Task:
        return next((task for task in self.tasks if task.id == task_id), None)
    
    def create_task(self, new_task: Task) -> Task:
        new_task.id = len(self.tasks) + 1
        self.tasks.append(new_task)
        return new_task
    
    def update_task(self, task: Task) -> Task:
        t = self.get_task(task_id=task.id)
        if t:
            t.pomodoros = task.pomodoros
            t.pomodoros_completed = task.pomodoros_completed
            t.name = task.name
        else:
            raise ValueError("Task not found")
        
        return t
    
    def delete_task(self, task_id: int) -> bool:
        task = self.get_task(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False