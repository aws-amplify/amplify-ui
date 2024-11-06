import { TaskHandlerInput, TaskData } from '../actions';

export type TaskStatus =
  | 'CANCELED'
  | 'FAILED'
  | 'COMPLETE'
  | 'OVERWRITE_PREVENTED'
  | 'QUEUED'
  | 'PENDING';

export type StatusCounts = Record<TaskStatus | 'TOTAL', number>;

export interface ProcessTasksOptions<
  T extends TaskData,
  U extends number | never,
> {
  concurrency?: U;
  onTaskError?: (data: Task<T>, error: Error | undefined) => void;
  onTaskProgress?: (data: Task<T>, progress: number | undefined) => void;
  onTaskSuccess?: (data: Task<T>) => void;
}

export interface Task<T extends TaskData = TaskData> {
  cancel: () => void;
  data: T;
  message: string | undefined;
  progress: number | undefined;
  remove: () => void;
  status: TaskStatus;
}

export type Tasks<T extends TaskData> = Task<T>[];

export type HandleProcessTasks<T extends TaskData, K, U> = (
  input: U extends T[]
    ? Omit<TaskHandlerInput<T> & K, 'data'>
    : TaskHandlerInput<T> & K
) => void;

export type UseProcessTasksState<T extends TaskData, K, D> = [
  {
    isProcessing: boolean;
    isProcessingComplete: boolean;
    statusCounts: StatusCounts;
    tasks: Tasks<T>;
  },
  HandleProcessTasks<T, K, D>,
];
