import type React from 'react';
import type { AsyncReducerState } from '@aws-amplify/ui-react-core';

import type {
  ActionHandler,
  CopyHandler,
  CreateFolderHandler,
  DeleteHandler,
  DownloadHandler,
  ListLocationItemsHandler,
  ListLocations,
  LocationData,
  UploadHandler,
} from '../actions';

import type { ProcessTasksOptions, StatusCounts, Task } from '../tasks';
import type { StorageBrowserActions } from '../createStorageBrowser';

export type ListActionState<T = any, K = any> = [
  state: AsyncReducerState<T>,
  handleAction: (...input: K[]) => void,
];

export interface DefaultActionHandlers {
  upload: UploadHandler;
  download: DownloadHandler;
  copy: CopyHandler;
  createFolder: CreateFolderHandler;
  delete: DeleteHandler;
}

export type ActionHandlers = Record<
  string,
  ActionHandler | ListLocationItemsHandler | ListLocations
>;

export interface ActionHandlersContext {
  handlers: ActionHandlers;
}

export interface ActionHandlersProviderProps extends ActionHandlersContext {
  children?: React.ReactNode;
}

export type ResolveHandlerType<T> = T extends { handler: infer X } | infer X
  ? X
  : never;

export type DerivedActionHandlers<TActions extends StorageBrowserActions> =
  DefaultActionHandlers & {
    [K in keyof NonNullable<TActions['custom']>]: ResolveHandlerType<
      NonNullable<TActions['custom']>[K]
    >;
  };

export type InferTask<THandler> = THandler extends ActionHandler<
  infer TData,
  infer TValue
>
  ? Task<TData, TValue>
  : never;

//////////////////////
// useHandler types //
//////////////////////

export interface UseHandlerOptions<TTask extends Task>
  extends Pick<
    ProcessTasksOptions<TTask>,
    'onTaskError' | 'onTaskProgress' | 'onTaskSuccess'
  > {}

export interface UseHandlerOptionsWithItems<TTask extends Task>
  extends UseHandlerOptions<TTask> {
  items: TTask['data'][];
}

export interface HandleTasksInput {
  location?: LocationData;
}

export interface TasksState<TTask> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: TTask[];
}

export type HandleTasksState<TTask> = [
  TasksState<TTask>,
  (input?: HandleTasksInput) => void,
];
export type HandleTaskState<TTask extends Task> = [
  { task: TTask; isProcessing: boolean },
  (input: HandleTaskInput<TTask['data']>) => void,
];

export interface HandleTaskInput<TData> {
  data: TData;
  location?: LocationData;
}

/////////////////////
// useAction types //
/////////////////////

export interface UseActionOptions<TTask extends Task>
  extends UseHandlerOptions<TTask> {}

export interface UseActionOptionsWithItems<TTask extends Task>
  extends UseActionOptions<TTask> {
  items: TTask['data'][];
}

interface HandleActionsInput extends HandleTasksInput {}

export type UseActionsState<TTask> = [
  TasksState<TTask>,
  (input?: HandleActionsInput) => void,
];

interface HandleActionInput<TTask> extends HandleTaskInput<TTask> {}

export type UseActionState<TTask extends Task> = [
  { task: TTask | undefined; isProcessing: boolean },
  (input: HandleActionInput<TTask['data']>) => void,
];

/**
 * @description `StorageBrowser` utility hook used to run default and custom action handlers from within a parent `StorageBrowser.Provider`. `useAction` provides the action handler with the current `location` state and credentials values, as well as any parameters provided as `data` at the `useAction` call site. accepts `handler` key to be run as initial argument and `options` with `items` as second. Returns batch tasks or atomic task state and `handler` accepting optional input allowing for location override
 * @example
 * batch actions - Returns batch task state and `handler` accepting optional input allowing for location override
 * ```tsx
 * // provide array of `items` to intialize `useAction` with batch handling behavior
 * const items = [];
 * const [{ tasks }, dispatchActions] = useAction('upload', { items })
 *
 * <button onClick={() => dispatchActions()}>start uploads</button>
 * ```
 *
 * @example
 * atomic action - returns atomic task `state` and `handler``input`, `handler` requires `input` containing `data` and `options`
 * ```tsx
 * // handler data
 * const data = {}
 * // do not provide `items` for atomic handling behavior
 * const [{ task }, dispatchAction] = useAction('upload')
 *
 * <button onClick={() => dispatchAction({ data })}>start upload</button>
 * ```
 */
export interface UseAction<
  Handlers extends Record<keyof Handlers, ActionHandler>,
> {
  <K extends keyof Handlers, TTask extends InferTask<Handlers[K]>>(
    key: K,
    options: UseActionOptionsWithItems<TTask>
  ): UseActionsState<TTask>;

  <K extends keyof Handlers, TTask extends InferTask<Handlers[K]>>(
    key: K,
    options?: UseActionOptions<TTask>
  ): UseActionState<TTask>;

  <K extends keyof Handlers, TTask extends InferTask<Handlers[K]>>(
    key: K,
    options?: UseActionOptionsWithItems<TTask> | UseActionOptions<TTask>
  ): UseActionsState<TTask> | UseActionState<TTask>;
}
