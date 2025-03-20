import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { AsyncDataAction, DataAction, DataState } from './types';

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

/**
 * @internal may be updated in future versions
 */
export default function useDataState<T, K>(
  action: DataAction<T, K> | AsyncDataAction<T, K>,
  initialData: T,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
): [state: DataState<T>, handleAction: (input: K) => void] {
  const [dataState, setDataState] = React.useState<DataState<T>>(() => ({
    ...INITIAL_STATE,
    data: initialData,
  }));

  const prevData = React.useRef(initialData);
  const pendingId = React.useRef<Symbol | undefined>();

  const { onSuccess, onError } = options ?? {};

  const handleAction: (input: K) => void = React.useCallback(
    (input) => {
      const id = Symbol();
      pendingId.current = id;

      setDataState(({ data }) => ({ ...LOADING_STATE, data }));

      resolveMaybeAsync(action(prevData.current, input))
        .then((data: T) => {
          if (pendingId.current !== id) return;

          prevData.current = data;

          if (isFunction(onSuccess)) onSuccess(data);

          setDataState({ ...INITIAL_STATE, data });
        })
        .catch((error: Error) => {
          if (pendingId.current !== id) return;

          if (isFunction(onError)) onError(error);

          const { message } = error;

          setDataState(({ data }) => ({ ...ERROR_STATE, data, message }));
        });
    },
    [action, onError, onSuccess]
  );

  return [dataState, handleAction];
}
