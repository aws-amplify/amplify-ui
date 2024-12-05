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
  T extends TaskData = TaskData,
  V = any,
  U extends number | never = never,
> {
  concurrency?: U;
  onTaskCancel?: (data: Task<T>) => void;
  onTaskComplete?: (data: Task<T>) => void;
  onTaskError?: (data: Task<T>, error: Error | undefined) => void;
  onTaskProgress?: (data: Task<T>, progress: number | undefined) => void;
  onTaskSuccess?: (data: Task<T>, value: V | undefined) => void;
  onTaskRemove?: (data: Task<T>) => void;
}

export interface Task<T extends TaskData = TaskData, V = any> {
  data: T;
  message: string | undefined;
  progress: number | undefined;
  status: TaskStatus;
  cancel?: () => void;
  value?: V;
}

export type Tasks<T extends TaskData, V = any> = Task<T, V>[];

export type HandleProcessTasks<T extends TaskData, U> = (
  input: U extends T[] ? Omit<TaskHandlerInput<T>, 'data'> : TaskHandlerInput<T>
) => void;

export interface TasksState<T extends TaskData = TaskData> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: Tasks<T>;
}
export type UseProcessTasksState<T extends TaskData, D> = [
  TasksState<T>,
  HandleProcessTasks<T, D>,
];
