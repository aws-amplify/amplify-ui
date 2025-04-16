import React from 'react';

import { isFunction } from '@aws-amplify/ui';

// async state constants
const INITIAL = { hasError: false, isLoading: false, message: undefined };
const LOADING = { hasError: false, isLoading: true, message: undefined };
const ERROR = { hasError: true, isLoading: false };

export interface AsyncReducerState<T> {
  /**
   * current value
   */
  value: T;
  hasError: boolean;
  isLoading: boolean;
  /**
   * error message, if any
   */
  message: string | undefined;
}

export type AsyncReducer<S, A> = (prevValue: S, action: A) => Promise<S>;

/**
 * @internal may be updated in future versions
 *
 * @description like `useReducer` but make it async
 *
 * @example
 * ```ts
 * import fetchData from './fetchData';
 *
 * type MyState = { data: string[] | undefined }
 * const initialState: MyState = { data: undefined }
 *
 * type MyAction = { type: 'fetch' | 'clear' }
 *
 * const asyncReducer = async (state: MyState, action: MyAction): Promise<MyState> => {
 *   switch(action.type) {
 *     case 'fetch':
 *       const data = await fetchData();
 *       return { data: state.data ? state.data.concat(data) : data }
 *     case 'clear':
 *       return { data: undefined }
 *   }
 * }
 *
 * const FetchDataButton = () => {
 *   const [state, dispatch] = useAsyncReducer(asyncReducer, initialState);
 *
 *   const { value: { data }, isLoading } = state;
 *
 *   return (
 *     <button onClick={() => isLoading ? null : dispatch({ type: 'fetch'})}>
 *       Fetch Data
 *     </button>
 *   )
 * }
 * ```
 */
export default function useAsyncReducer<T, K>(
  reducer: AsyncReducer<T, K>,
  initialValue: T,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
): [AsyncReducerState<T>, React.Dispatch<K>] {
  const [state, setAsyncState] = React.useState<AsyncReducerState<T>>(() => ({
    ...INITIAL,
    value: initialValue,
  }));

  const prevValue = React.useRef(initialValue);
  const pendingId = React.useRef<Symbol | undefined>();

  const { onSuccess, onError } = options ?? {};

  const dispatch: React.Dispatch<K> = React.useCallback(
    (input) => {
      const id = Symbol();
      pendingId.current = id;

      setAsyncState(({ value }) => ({ ...LOADING, value }));

      reducer(prevValue.current, input)
        .then((value: T) => {
          if (pendingId.current !== id) return;

          prevValue.current = value;

          if (isFunction(onSuccess)) onSuccess(value);

          setAsyncState({ ...INITIAL, value });
        })
        .catch((error: Error) => {
          if (pendingId.current !== id) return;

          if (isFunction(onError)) onError(error);

          const { message } = error;

          setAsyncState(({ value }) => ({ ...ERROR, value, message }));
        });
    },
    [onError, onSuccess, reducer]
  );

  return [state, dispatch];
}
