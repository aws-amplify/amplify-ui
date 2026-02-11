import type {
  TaskData,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskResult,
  TaskResultStatus,
} from '../actions';

/**
 * extends {@link TaskResultStatus} to include `QUEUED` and `PENDING` statuses
 * used in task processing
 */
export type TaskStatus = TaskResultStatus | 'QUEUED' | 'PENDING' | 'FINISHING';

/**
 * aggregate task status counts
 */
export type StatusCounts = Record<TaskStatus | 'TOTAL', number>;

export interface ProcessTasksOptions<TTask extends Task, TItems = []> {
  items?: TItems;
  onTaskCancel?: (task: TTask) => void;
  onTaskComplete?: (task: TTask) => void;
  onTaskError?: (task: TTask, error: unknown) => void;
  onTaskProgress?: (
    task: TTask,
    progressDetails:
      | number
      | {
          progress?: number;
          successCount?: number;
          failureCount?: number;
        }
  ) => void;
  onTaskSuccess?: (task: TTask, value: TTask['value'] | undefined) => void;
  onTaskRemove?: (task: TTask) => void;
}

/**
 * `task` properties, extends {@link TaskResult} with task data, optional cancel
 * handler and progress
 */
export interface Task<TData = unknown, TValue = any>
  extends TaskResult<TaskStatus, TValue> {
  /**
   * task specific data
   */
  data: TData & TaskData;

  /**
   * task progress (0-1 representing completion percentage)
   * @example 0.75 // 75% complete
   */
  progress?: number;

  /**
   * cancel handler
   */
  cancel?: () => void;
}

export type HandleProcessTasks<TInput> = (input: TInput) => void;

export interface TasksState<TTask> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: TTask[];
}

export type UseProcessTasksState<TTask, TInput> = [
  TasksState<TTask>,
  HandleProcessTasks<TInput>,
];

interface HandleTasksOptions extends TaskHandlerOptions {
  concurrency?: number;
}

export interface HandleBatchTasksInput<TData extends TaskData>
  extends Omit<TaskHandlerInput<TData, HandleTasksOptions>, 'data' | 'all'> {}

export interface HandleSingleTaskInput<TData extends TaskData>
  extends TaskHandlerInput<TData> {}

export type InferHandleTasksInput<
  TItems,
  TData extends TaskData,
> = TItems extends NonNullable<TItems>
  ? HandleBatchTasksInput<TData>
  : HandleSingleTaskInput<TData>;
