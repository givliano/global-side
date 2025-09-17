import type { TaskState, TaskAction } from '../types/types';

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ERROR': {
      return {
        ...state,
        error: true,
      };
    }
    case 'FINISH_LOADING': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'ESCALATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.contractNumber === action.payload
            ? { ...task, status: 'escalated' }
            : task
        ),
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.contractNumber === action.payload
            ? { ...task, status: 'completed' }
            : task
        ),
      };
    case 'SKIP_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.contractNumber === action.payload
            ? { ...task, status: 'skipped' }
            : task
        ),
      };
    case 'CHANGE_BIRTHDAY':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.contractNumber === action.payload.contractNumber
            ? { ...task, ocrBirthdate: action.payload.birthday }
            : task
        ),
      };
    default:
      return state;
  }
}
