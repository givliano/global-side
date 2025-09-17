import TaskListItem from './TaskListItem';

import type { Task } from '../types/types';

type TaskListProps = {
  tasks: Task[];
  selectedTask: Task | null;
  handleClick: (task: Task) => void;
};

export default function TaskList({
  tasks,
  selectedTask,
  handleClick,
}: TaskListProps) {
  return (
    <aside className="overflow-y-scroll shadow-lg px-2 py-6 rounded-lg h-96 lg:h-full lg:max-h-[calc(100vh-14rem)] bg-white">
      <div className="flex flex-col space-y-3">
        <h3 className="font-bold">Tasks</h3>
        {tasks.map((task) => (
          <TaskListItem
            key={task.contractNumber}
            task={task}
            isSelected={task.contractNumber === selectedTask?.contractNumber}
            handleClick={handleClick}
          />
        ))}
      </div>
    </aside>
  );
}
