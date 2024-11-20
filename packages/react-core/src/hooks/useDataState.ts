import { isFunction } from '@aws-amplify/ui';
import React from 'react';

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

// default state
const INITIAL_STATE = { hasError: false, isLoading: false, message: undefined };
const LOADING_STATE = { hasError: false, isLoading: true, message: undefined };
const ERROR_STATE = { hasError: true, isLoading: false };

const resolveMaybeAsync = async <T>(
  value: T | Promise<T>
): Promise<Awaited<T>> => {
  const awaited = await value;
  return awaited;
};

export default function useDataState<T, K>(
  action: DataAction<T, K> | AsyncDataAction<T, K>,
  initialData: T,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (message: string) => void;
  }
): [state: DataState<T>, handleAction: (input: K) => void] {
  const [dataState, setDataState] = React.useState<DataState<T>>(() => ({
    ...INITIAL_STATE,
    data: initialData,
  }));

  const prevData = React.useRef(initialData);

  const { onSuccess, onError } = options ?? {};

  const handleAction: (input: K) => void = React.useCallback(
    (input) => {
      setDataState(({ data }) => ({ ...LOADING_STATE, data }));

      resolveMaybeAsync(action(prevData.current, input))
        .then((data: T) => {
          if (isFunction(onSuccess)) onSuccess(data);

          prevData.current = data;
          setDataState({ ...INITIAL_STATE, data });
        })
        .catch(({ message }: Error) => {
          if (isFunction(onError)) onError(message);

          setDataState(({ data }) => ({ ...ERROR_STATE, data, message }));
        });
    },
    [action, onError, onSuccess]
  );

  return [dataState, handleAction];
}
