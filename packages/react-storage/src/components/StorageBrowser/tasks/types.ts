import {
  TaskHandlerInput,
  TaskData,
  TaskResult,
  TaskResultStatus,
} from '../actions';

/**
 * extends {@link TaskResultStatus} to include `QUEUED` and `PENDING` statuses
 * used in task processing
 */
export type TaskStatus = TaskResultStatus | 'QUEUED' | 'PENDING';

/**
 * aggregate task status counts
 */
export type StatusCounts = Record<TaskStatus | 'TOTAL', number>;

export interface ProcessTasksOptions<
  TData extends TaskData = TaskData,
  TValue = any,
  TConcurrency extends number | never = never,
> {
  concurrency?: TConcurrency;
  onTaskCancel?: (data: Task<TData>) => void;
  onTaskComplete?: (data: Task<TData>) => void;
  onTaskError?: (data: Task<TData>, error: Error | undefined) => void;
  onTaskProgress?: (data: Task<TData>, progress: number | undefined) => void;
  onTaskSuccess?: (data: Task<TData>, value: TValue | undefined) => void;
  onTaskRemove?: (data: Task<TData>) => void;
}

/**
 * task properties, extends {@link TaskResult} with task data, optional cancel
 * handler and progress
 */
export interface Task<TData extends TaskData = TaskData, TValue = any>
  extends TaskResult<TaskStatus, TValue> {
  /**
   * task specific data
   */
  data: TData;

  /**
   * optional task progress
   */
  progress?: number;

  /**
   * optional cancel handler
   */
  cancel?: () => void;
}

export type Tasks<TData extends TaskData, TValue = any> = Task<TData, TValue>[];

export type HandleProcessTasks<TData extends TaskData, TItems> = (
  // conditionally type input based on whether `items` are provided
  input: TItems extends TData[]
    ? Omit<TaskHandlerInput<TData>, 'data'>
    : TaskHandlerInput<TData>
) => void;

export interface TasksState<TData extends TaskData = TaskData, TValue = any> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: Tasks<TData, TValue>;
}

export type UseProcessTasksState<TData extends TaskData, TItems> = [
  TasksState<TData>,
  HandleProcessTasks<TData, TItems>,
];
