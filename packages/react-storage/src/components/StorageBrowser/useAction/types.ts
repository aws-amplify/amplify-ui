import React from 'react';
import { DataState } from '@aws-amplify/ui-react-core';

import {
  ActionHandler,
  ExtendedActionConfigs,
  CopyHandler,
  CreateFolderHandler,
  DeleteHandler,
  DownloadHandler,
  ListLocationItemsHandler,
  ListLocations,
  LocationData,
  TaskData,
  UploadHandler,
} from '../actions';

import { ProcessTasksOptions, StatusCounts, Task, Tasks } from '../tasks';

export type ListActionState<T = any, K = any> = [
  state: DataState<T>,
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

type DerivedCustomActions<T> = T extends { custom?: infer U } ? U : {};

export type ResolveHandlerType<T> = T extends { handler: infer X } | infer X
  ? X
  : never;

export type DerivedActionHandlers<
  C extends ExtendedActionConfigs = ExtendedActionConfigs,
  D extends DerivedCustomActions<C> = DerivedCustomActions<C>,
> = DefaultActionHandlers & {
  [K in keyof D]: ResolveHandlerType<D[K]>;
};

export interface HandleTasksOptions<TTask extends Task, TItems>
  extends Pick<
    ProcessTasksOptions<TTask, TItems, never>,
    'items' | 'onTaskError' | 'onTaskSuccess'
  > {}

export type InferActionOptions<T> = T extends ActionHandler<
  infer I extends TaskData,
  infer R
>
  ? HandleTasksOptions<Task<I, R>, never>
  : never;

export interface HandleTasksInput {
  location?: LocationData;
}

export interface HandleTaskInput<TData> extends HandleTasksInput {
  data: TData;
}

// export type HandlerInput<TData, U> = U extends undefined
//   ? HandleTaskInput<TData>
//   : HandleTasksInput;

export type HandlerInput<TData extends TaskData, TItems> = (
  // conditionally type input based on whether `items` are provided
  input: TItems extends TData[] ? HandleTasksInput : HandleTaskInput<TData>
) => void;

// export type InferHandlerInput<T, U = undefined> = T extends ActionHandler<
//   infer I,
//   infer R
// >
//   ? HandlerInput<I, R, U>
//   : never;

export interface TasksState<TTask> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: TTask[];
}

type HandleTasks = (input?: HandleTasksInput) => void;
type UseTasksState<TTask> = [TasksState<TTask>, HandleTasks];

type HandleTask<TData> = (input: HandleTaskInput<TData>) => void;

type UseTaskState<TTask extends Task> = [
  { task: TTask | undefined; isProcessing: boolean },
  HandleTask<TTask['data']>,
];

export type UseHandlerState<
  TTask extends Task,
  TItems = undefined,
> = TItems extends undefined ? UseTaskState<TTask> : UseTasksState<TTask>;

export type InferUseHandlerState<T, U = undefined> = T extends ActionHandler<
  infer I,
  infer R
>
  ? UseHandlerState<Task<I & TaskData, R>, U>
  : never;

/**
 * `StorageBrowser` utility hook used to run default and custom action handlers
 * from within a parent `StorageBrowser.Provider`. `useAction` provides the
 * action handler with the current `location` state and credentials values,
 * as well as any parameters provided as `data` at the `useAction` call site
 */
export interface UseAction<
  Handlers extends Record<keyof Handlers, ActionHandler>,
> {
  /**
   * Returns atomic task `state` and `handler``input`, `handler`
   * requires `input` containing `data` and `options`
   */
  <K extends keyof Handlers>(key: K): InferUseHandlerState<Handlers[K]>;

  /**
   * Returns batch task state and `handler` with optional input, accepts `options`
   * as second argument
   */
  <K extends keyof Handlers, TOptions extends InferActionOptions<Handlers[K]>>(
    key: K,
    options?: TOptions
  ): InferUseHandlerState<Handlers[K], TOptions>;
}
