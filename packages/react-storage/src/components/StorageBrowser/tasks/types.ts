import type {
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

export interface ProcessTasksOptions<TTask extends Task, TItems = []> {
  // has no impact in atomic mode
  concurrency?: number;
  items?: TItems;
  onTaskCancel?: (task: TTask) => void;
  onTaskComplete?: (task: TTask) => void;
  onTaskError?: (task: TTask, error: unknown) => void;
  onTaskProgress?: (task: TTask, progress: number | undefined) => void;
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
   * task progress
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

export type InferHandleTasksInput<
  TItems,
  TData extends TaskData,
> = TItems extends NonNullable<TItems>
  ? Omit<TaskHandlerInput<TData>, 'data'>
  : TaskHandlerInput<TData>;
