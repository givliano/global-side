import type { Task, TaskAction, TaskState } from '../types/types';

import TaskDetailCard from './TaskDetailCard';

type TaskDetailProps = {
  task: Task | null;
  state: TaskState;
  dispatch: React.ActionDispatch<[action: TaskAction]>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function TaskDetail({
  task,
  state,
  dispatch,
  setSelectedTask,
}: TaskDetailProps) {
  if (!task) {
    return (
      <div className="border border-gray-100 shadow-lg rounded-lg text-primary p-4 space-y-6 h-full min-h-64 items-center justify-center flex flex-1 lg:h-[calc(100vh-14rem)] lg:max-h-full">
        <h2 className="text-2xl font-bold">No task selected</h2>
      </div>
    );
  }

  return (
    <TaskDetailCard
      task={task}
      state={state}
      dispatch={dispatch}
      setSelectedTask={setSelectedTask}
    />
  );
}
