import { LocationCredentialsProvider } from '../storage-internal';

import { ActionState } from '../context/actions/createActionStateContext';

export interface ActionInputConfig {
  accountId?: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskHandlerOptions {
  onError?: (key: string, message: string) => string;
  onComplete?: (key: string) => string;
}

export interface TaskHandlerInput<T = never, K = undefined>
  extends ActionInput<K> {
  data: { key: string; payload: T };
}

export interface TaskHandlerOutput<T = 'COMPLETE' | 'FAILED'> {
  key: string;
  result: Promise<T>;
}

export interface CancelableTaskHandlerOutput
  extends TaskHandlerOutput<'COMPLETE' | 'FAILED' | 'CANCELED'> {
  cancel?: () => void;
  pause?: () => void;
  resume?: () => void;
}

export type TaskHandler<T = any, K = any> = (input: T) => K;

export interface ListHandlerOptions<T = never> {
  exclude?: T;
  nextToken?: string;
  pageSize?: number;
}

export interface ListHandlerInput<T = any> extends ActionInput<T> {}

export interface ListHandlerOutput<T = any> {
  nextToken: string | undefined;
  items: T[];
}

export type ListHandler<T = any, K = any> = (input: T) => Promise<K>;

export type UseAction<T> = T extends
  | ListHandler<infer K, infer U>
  | TaskHandler<infer K, infer U>
  ? ActionState<U, K>
  : never;

export type CreateUseAction = <T>(
  actions: T
) => <K extends keyof T>(key: K) => UseAction<T[K]>;
