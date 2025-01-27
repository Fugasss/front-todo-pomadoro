import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

interface TimerState {
  time: number;
  isRunning: boolean;
  mode: "pomodoro" | "shortBreak" | "longBreak";
}

interface Task {
  name: string;
  tomatoes: number;
}

// Redux slices
const timerSlice = createSlice({
  name: "timer",
  initialState: { time: 1500, isRunning: false, mode: "pomodoro" } as TimerState,
  reducers: {
    startTimer(state) {
      state.isRunning = true;
    },
    pauseTimer(state) {
      state.isRunning = false;
    },
    tick(state) {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
    },
    resetTimer(state, action: PayloadAction<number>) {
      state.isRunning = false;
      state.time = action.payload;
    },
    switchMode(state, action: PayloadAction<TimerState["mode"]>) {
      state.isRunning = false;
      state.mode = action.payload;
      if (action.payload === "pomodoro") state.time = 1500;
      else if (action.payload === "shortBreak") state.time = 300;
      else if (action.payload === "longBreak") state.time = 900;
    },
  },
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

// Components
const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const { time, isRunning, mode } = useSelector((state: { timer: TimerState }) => state.timer);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(timerSlice.actions.tick());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
      <div className="text-4xl font-mono">{formatTime(time)}</div>
      <div className="flex gap-4">
        <button
          onClick={() =>
            dispatch(
              isRunning ? timerSlice.actions.pauseTimer() : timerSlice.actions.startTimer()
            )
          }
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => dispatch(timerSlice.actions.switchMode("pomodoro"))}>
          Pomodoro
        </button>
        <button onClick={() => dispatch(timerSlice.actions.switchMode("shortBreak"))}>
          Short Break
        </button>
        <button onClick={() => dispatch(timerSlice.actions.switchMode("longBreak"))}>
          Long Break
        </button>
      </div>
    </div>
  );
};

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const [newTask, setNewTask] = React.useState("");
  const [selectedTomatoes, setSelectedTomatoes] = React.useState(1);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        tasksSlice.actions.addTask({ name: newTask, tomatoes: selectedTomatoes })
      );
      setNewTask("");
      setSelectedTomatoes(1);
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={selectedTomatoes}
          onChange={(e) => setSelectedTomatoes(parseInt(e.target.value))}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm"
          >
            <span>{task.name}</span>
            <span>{task.tomatoes} 🍅</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PomodoroApp: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="p-4 max-w-4xl mx-auto">
        <Timer />
        <TaskList />
      </div>
    </Provider>
  );
};

export default PomodoroApp;
