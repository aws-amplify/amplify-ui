export interface DataState<T> {
  data: T;
  hasError: boolean;
  isLoading: boolean;
  message: string | undefined;
}

export type DataAction<T = any, K = any> = (prevData: T, input: K) => T;

export type AsyncDataAction<T = any, K = any> = (
  prevData: T,
  input: K
) => Promise<T>;
