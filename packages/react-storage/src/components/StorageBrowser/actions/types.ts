import { LocationCredentialsProvider } from '../storage-internal';

export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';
export interface ActionInputConfig {
  accountId: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  // permission???
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface DataTaskActionInput<T = never, K = undefined>
  extends ActionInput<K> {
  data: T;
}

export interface DataTaskActionOutput {
  cancel?: () => void;
  key: string;
  pause?: () => void;
  result: Promise<'COMPLETE' | 'FAILED' | 'CANCELED'>;
  resume?: () => void;
}

export type DataTaskAction<T = any> = (input: T) => DataTaskActionOutput;

export interface ListActionOptions<T> {
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
