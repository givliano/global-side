import { ClipboardCheck } from 'lucide-react';

import type { Task } from '../types/types';

type TaskItemProps = {
  task: Task;
  isSelected: boolean;
  handleClick: (task: Task) => void;
};

export default function TaskListItem({
  task,
  isSelected,
  handleClick,
}: TaskItemProps) {
  return (
    <div
      className={`rounded-lg flex items-center p-2 justify-start cursor-pointer ${
        isSelected ? 'bg-blue-200' : 'bg-blue-50'
      }`}
      onClick={() => handleClick(task)}
      key={task.contractNumber}
    >
      <ClipboardCheck size={24} />
      <span className="mr-auto ml-2 pr-6">{task.taskName}</span>
      <div className="w-22 flex flex-col items-start">
        <p className="flex justify-start font-semibold">Status:</p>
        <p>{task.status}</p>
      </div>
    </div>
  );
}
