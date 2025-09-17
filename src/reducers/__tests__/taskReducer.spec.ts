import mockData from '../../data/data.json';
import type { TaskAction, TaskState } from '../../types/types';
import { taskReducer } from '../taskReducer';

const initialState = {
  tasks: [],
  loading: true,
  error: false,
} as TaskState;

const loadedState = {
  ...initialState,
  tasks: mockData,
};

describe('App State', () => {
  it('should load tasks into state', () => {
    const action = { type: 'LOAD_TASKS', payload: mockData } as TaskAction;

    const newState = taskReducer(initialState, action);

    expect(newState).toEqual(loadedState);
  });

  it('should set error state', () => {
    const action = { type: 'ERROR' } as TaskAction;

    const newState = taskReducer(initialState, action);

    expect(newState).toEqual({ ...initialState, error: true });
  });

  it('should unset loading state', () => {
    const action = { type: 'FINISH_LOADING' } as TaskAction;

    const newState = taskReducer(initialState, action);

    expect(newState).toEqual({ ...initialState, loading: false });
  });
});

describe('Action Reducers', () => {
  it('should escalate a task', () => {
    const action = {
      type: 'ESCALATE_TASK',
      payload: loadedState.tasks[0].contractNumber,
    } as TaskAction;

    const newState = taskReducer(loadedState, action);

    expect(newState.tasks[0].status).toBe('escalated');
  });

  it('should complete a task', () => {
    const action = {
      type: 'COMPLETE_TASK',
      payload: loadedState.tasks[0].contractNumber,
    } as TaskAction;

    const newState = taskReducer(loadedState, action);

    expect(newState.tasks[0].status).toBe('completed');
  });

  it('should skip a task', () => {
    const action = {
      type: 'SKIP_TASK',
      payload: loadedState.tasks[0].contractNumber,
    } as TaskAction;

    const newState = taskReducer(loadedState, action);

    expect(newState.tasks[0].status).toBe('skipped');
  });

  it('should change tasks birthday', () => {
    const birthday = '2000-01-01';
    const action = {
      type: 'CHANGE_BIRTHDAY',
      payload: {
        contractNumber: loadedState.tasks[0].contractNumber,
        birthday,
      },
    } as TaskAction;

    const newState = taskReducer(loadedState, action);

    expect(newState.tasks[0].ocrBirthdate).toBe(birthday);
  });
});
