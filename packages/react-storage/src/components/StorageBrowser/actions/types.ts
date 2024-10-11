import { LocationCredentialsProvider } from '../storage-internal';

import { ActionState } from '../context/actions/createActionStateContext';

export interface ActionInputConfig {
  accountId: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskActionInput<T = never, K = undefined>
  extends ActionInput<K> {
  data: T;
}

export interface TaskActionOutput<T = 'COMPLETE' | 'FAILED'> {
  key: string;
  result: Promise<T>;
}

export interface CancelableTaskActionOutput
  extends TaskActionOutput<'COMPLETE' | 'FAILED' | 'CANCELED'> {
  cancel?: () => void;
  pause?: () => void;
  resume?: () => void;
}

export type TaskAction<T = any, K = any> = (input: T) => K;

export interface ListActionOptions<T = never> {
  exclude?: T;
  nextToken?: string;
  pageSize?: number;
}

export interface ListActionInput<T = any> extends ActionInput<T> {}

export interface ListActionOutput<T = any> {
  nextToken: string | undefined;
  items: T[];
}

export type ListAction<T = any, K = any> = (input: T) => Promise<K>;

export type UseAction<T> = T extends
  | ListAction<infer K, infer U>
  | TaskAction<infer K, infer U>
  ? ActionState<U, K>
  : never;

export type CreateUseAction = <T>(
  actions: T
) => <K extends keyof T>(key: K) => UseAction<T[K]>;
