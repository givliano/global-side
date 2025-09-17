export type Task = {
  taskName: string;
  contractNumber: number;
  name: string;
  status: string;
  ocrBirthdate: string;
  sex: string;
  address: string;
  telephone: string;
};

export type TaskAction =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ERROR' }
  | { type: 'FINISH_LOADING' }
  | { type: 'ESCALATE_TASK'; payload: number }
  | { type: 'COMPLETE_TASK'; payload: number }
  | { type: 'SKIP_TASK'; payload: number }
  | {
      type: 'CHANGE_BIRTHDAY';
      payload: { birthday: string; contractNumber: number };
    };

export type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: boolean;
};
