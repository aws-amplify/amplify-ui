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

export interface HandleTasksOptions<U extends TaskData = TaskData> {
  items: U[];
  onTaskSuccess?: (task: Task<U>) => void;
}

interface HandleTasksInput {
  location?: LocationData;
}

export interface HandleTaskInput<T, K> {
  data: T;
  location?: LocationData;
  options?: {
    onSuccess?: (data: { id: string; key: string }, value: K) => void;
    onError?: (
      data: { id: string; key: string },
      message: string | undefined
    ) => void;
  };
}

export type HandlerInput<
  T extends TaskData,
  K,
  U = undefined,
> = U extends undefined ? HandleTaskInput<T, K> : HandleTasksInput;

export interface TasksState<T extends TaskData, V = any> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  reset: () => void;
  statusCounts: StatusCounts;
  tasks: Tasks<T, V>;
}

export type HandleTasks = (input?: HandleTasksInput) => void;
export type UseTasksState<T extends TaskData, V = any> = [
  TasksState<T, V>,
  HandleTasks,
];

export type HandleTask<T, K> = (input: HandleTaskInput<T, K>) => void;
export type UseTaskState<T extends TaskData, R> = [
  { task: Task<T, R> | undefined; isProcessing: boolean },
  HandleTask<T, R>,
];

export type UseHandlerState<
  T extends TaskData,
  R,
  U = undefined,
> = U extends undefined ? UseTaskState<T, R> : UseTasksState<T, R>;

export type UseAction<V extends Record<keyof V, ActionHandler>> = <
  K extends keyof V,
  TData extends V[K] extends ActionHandler<infer D> ? D & TaskData : never,
  TOptions extends HandleTasksOptions<TData>,
  U extends TOptions | undefined = undefined,
>(
  key: K,
  options?: U
) => UseHandlerState<
  TData,
  V[K] extends ActionHandler<any, infer R> ? R : never,
  U extends TOptions ? TOptions : undefined
>;
