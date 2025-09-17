import { useEffect, useState, useReducer } from 'react';
import './App.css';

import mockData from './data/data.json';
import TaskDetail from './components/TaskDetail';
import TaskList from './components/TaskList';
import { taskReducer } from './reducers/taskReducer';
import type { Task } from './types/types';
import Header from './components/Header';

function App() {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: true,
    error: false,
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    // Simulate API call
    try {
      dispatch({ type: 'LOAD_TASKS', payload: mockData });
    } catch (e) {
      dispatch({ type: 'ERROR' });
      console.log('Error loading data:', e);
    } finally {
      dispatch({ type: 'FINISH_LOADING' });
    }
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  // Sync selectedTask with current state task when task prop is updated (e.g. birthday change)
  useEffect(() => {
    if (selectedTask) {
      const updatedTask = state.tasks.find(
        (task: Task) => task.contractNumber === selectedTask.contractNumber
      );
      if (updatedTask && updatedTask !== selectedTask) {
        setSelectedTask(updatedTask);
      }
    }
  }, [state.tasks, selectedTask]);

  if (state.error) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="max-h-screen">
      <Header name={selectedTask?.name} />
      <main className="flex flex-col-reverse lg:flex-row gap-4 py-4 max-h-[calc(100vh-12rem)]">
        {state.loading ? (
          <p>Loading tasks data...</p>
        ) : (
          <>
            <TaskDetail
              task={selectedTask}
              dispatch={dispatch}
              state={state}
              setSelectedTask={setSelectedTask}
            />
            <TaskList
              tasks={state.tasks}
              selectedTask={selectedTask}
              handleClick={handleTaskClick}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
