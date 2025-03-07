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
import { StatusCounts, Task, Tasks } from '../tasks';

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

export interface HandleTasksOptions<
  TData extends TaskData = TaskData,
  TResult = any,
> {
  items: TData[];
  onTaskSuccess?: (task: Task<TData, TResult>) => void;
}

export type InferActionOptions<T> = T extends ActionHandler<infer I, infer R>
  ? HandleTasksOptions<I & TaskData, R>
  : never;

interface HandleTasksInput {
  location?: LocationData;
}

interface HandleTaskInput<TData, TResult> {
  data: TData;
  location?: LocationData;
  options?: {
    onSuccess?: (data: { id: string; key: string }, result: TResult) => void;
    onError?: (
      data: { id: string; key: string },
      message: string | undefined,
      error: Error
    ) => void;
  };
}

type HandlerInput<TData, TResult, U> = U extends undefined
  ? HandleTaskInput<TData, TResult>
  : HandleTasksInput;

export type InferHandlerInput<T, U = undefined> = T extends ActionHandler<
  infer I,
  infer R
>
  ? HandlerInput<I, R, U>
  : never;

export interface TasksState<TData extends TaskData, TResult> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: Tasks<TData, TResult>;
}

type HandleTasks = (input?: HandleTasksInput) => void;
type UseTasksState<TData extends TaskData, TResult> = [
  TasksState<TData, TResult>,
  HandleTasks,
];

type HandleTask<TData, TResult> = (
  input: HandleTaskInput<TData, TResult>
) => void;
type UseTaskState<TData extends TaskData, TResult> = [
  { task: Task<TData, TResult> | undefined; isProcessing: boolean },
  HandleTask<TData, TResult>,
];

type UseHandlerState<
  TData extends TaskData,
  TResult,
  U = undefined,
> = U extends undefined
  ? UseTaskState<TData, TResult>
  : UseTasksState<TData, TResult>;

export type InferUseHandlerState<T, U = undefined> = T extends ActionHandler<
  infer I,
  infer R
>
  ? UseHandlerState<I & TaskData, R, U>
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
