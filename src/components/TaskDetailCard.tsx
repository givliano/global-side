import { AlertTriangle, CheckCircle, SkipForward, User } from 'lucide-react';

import type { Task, TaskAction, TaskState } from '../types/types';

type TaskDetailCardProps = {
  task: Task;
  state: TaskState;
  dispatch: React.ActionDispatch<[action: TaskAction]>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function TaskDetailCard({
  task,
  state,
  dispatch,
  setSelectedTask,
}: TaskDetailCardProps) {
  const goToNextTask = (currentContractNumber: number) => {
    const currentIndex = state.tasks.findIndex(
      (task) => task.contractNumber === currentContractNumber
    );
    // Loops back to the 0 at the end of the array
    const nextIndex = (currentIndex + 1) % state.tasks.length;
    setSelectedTask(state.tasks[nextIndex]);
  };

  const handleEscalate = (contractNumber: number) => {
    dispatch({ type: 'ESCALATE_TASK', payload: contractNumber });
    goToNextTask(contractNumber);
  };

  const handleMarkDone = (contractNumber: number) => {
    dispatch({ type: 'COMPLETE_TASK', payload: contractNumber });
    goToNextTask(contractNumber);
  };

  const handleSkip = (contractNumber: number) => {
    dispatch({ type: 'SKIP_TASK', payload: contractNumber });
    goToNextTask(contractNumber);
  };

  const handleBirthdayChange = (birthday: string, contractNumber: number) => {
    dispatch({
      type: 'CHANGE_BIRTHDAY',
      payload: { contractNumber, birthday },
    });
  };
  return (
    <div className="border border-gray-100 shadow-lg rounded-lg text-primary p-4 grow-1 h-content flex-1 shrink-1 basis-4">
      <div className="lg:w-3xl space-y-2 md:space-y-6 lg:space-y-12">
        <div className="flex items-center space-x-4 justify-start">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User size={24} className="shrink-0 text-blue-700 " />
          </div>
          <div className="flex flex-col items-start basis-4/8 pl-4 text-blue-400">
            <p className="font-semibold">Insured person</p>
            <p>{task.name}</p>
          </div>
          <div className="flex flex-col items-start basis-4/8">
            <p className="text-gray-500">Insurance number</p>
            <p>{task.contractNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-start w-20">
            <p className="text-gray-500">Gender</p>
            <p>{task.sex}</p>
          </div>
          <div className="flex flex-col items-start w-32">
            <label htmlFor="birthday" className="text-gray-500">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              onChange={(e) =>
                handleBirthdayChange(e.target.value, task.contractNumber)
              }
              name="birthday"
              value={task.ocrBirthdate}
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-start w-20">
            <p className="text-gray-500">Vp-Nr.</p>
            <p>01</p>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-500">Telephone number</p>
          <p>{task.telephone}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-500">Address</p>
          <p>{task.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleEscalate(task.contractNumber)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-300 transition-colors disabled:opacity-50"
            disabled={task.status === 'escalated'}
          >
            <AlertTriangle size={16} />
            Escalate
          </button>

          <button
            onClick={() => handleMarkDone(task.contractNumber)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100  rounded-lg hover:bg-green-300 transition-colors"
            disabled={task.status === 'completed'}
          >
            <CheckCircle size={16} />
            Mark Done
          </button>

          <button
            onClick={() => handleSkip(task.contractNumber)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={task.status === 'skipped'}
          >
            <SkipForward size={16} />
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
