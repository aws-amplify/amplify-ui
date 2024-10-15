import { TaskHandlerInput } from '../actions';

export type TaskStatus =
  | 'CANCELED'
  | 'FAILED'
  | 'COMPLETE'
  | 'QUEUED'
  | 'PENDING';

export interface ProcessTasksOptions {
  concurrency?: number;
  isCancelable?: boolean;
}

export interface Task<T = any> {
  cancel: undefined | (() => void);
  item: T;
  key: string;
  message: string | undefined;
  remove: () => void;
  status: TaskStatus;
}

export type HandleProcessTasks<T, K> = (
  ...input: Omit<TaskHandlerInput<T, K>, 'data'>[]
) => void;

export type ProcessTasksState<T = any, K = any> = [
  tasks: Task<T>[],
  handleProcessTasks: HandleProcessTasks<T, K>,
];
