import { TaskHandlerInput } from '../actions';

export type TaskStatus =
  | 'CANCELED'
  | 'FAILED'
  | 'OVERWRITE_PREVENTED'
  | 'COMPLETE'
  | 'QUEUED'
  | 'PENDING';

export interface ProcessTasksOptions {
  concurrency?: number;
  isCancelable?: boolean;
}

export interface Task<T = any> {
  cancel: undefined | (() => void);
  id: string;
  item: T;
  key: string;
  message: string | undefined;
  remove: () => void;
  status: TaskStatus;
}

export type HandleProcessTasks<T, K> = (
  ...input: Omit<TaskHandlerInput<T, K>, 'data' | 'key'>[]
) => void;

export type ProcessTasksState<T = any, K = any> = [
  tasks: Task<T>[],
  handleProcessTasks: HandleProcessTasks<T, K>,
];
