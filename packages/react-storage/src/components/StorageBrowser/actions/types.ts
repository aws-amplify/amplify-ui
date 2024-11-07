import { DataState } from '@aws-amplify/ui-react-core';
import { LocationCredentialsProvider } from '../storage-internal';

export type ActionState<T = any, K = any> = [
  state: DataState<T>,
  handleAction: (...input: K[]) => void,
];

export interface ActionInputConfig {
  accountId?: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  customEndpoint?: string;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskData {
  key: string;
  id: string;
}

export interface TaskHandlerOptions {
  onProgress?: (
    data: { key: string; id: string },
    progress: number | undefined
  ) => void;
}

export interface TaskHandlerInput<
  T extends TaskData = TaskData,
  K extends TaskHandlerOptions = TaskHandlerOptions,
> {
  config: ActionInputConfig;
  data: T;
  options?: K;
}

export interface TaskHandlerOutput {
  cancel?: () => void;
  result: Promise<{
    message?: string;
    status: 'CANCELED' | 'COMPLETE' | 'FAILED' | 'OVERWRITE_PREVENTED';
  }>;
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
