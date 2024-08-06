import React from 'react';

export interface DataState<T> {
  data: T;
  hasError: boolean;
  isLoading: boolean;
  message: string | undefined;
}

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
  action: (prevData: T, ...input: K[]) => T | Promise<T>,
  initialData: T
): [state: DataState<T>, handleAction: (...input: K[]) => void] {
  const [dataState, setDataState] = React.useState<DataState<T>>(() => ({
    ...INITIAL_STATE,
    data: initialData,
  }));

  const prevData = React.useRef(initialData);

  const handleAction: (...input: K[]) => void = React.useCallback(
    (...input) => {
      setDataState(({ data }) => ({ ...LOADING_STATE, data }));

      resolveMaybeAsync(action(prevData.current, ...input))
        .then((data: T) => {
          prevData.current = data;
          setDataState({ ...INITIAL_STATE, data });
        })
        .catch(({ message }: Error) => {
          setDataState(({ data }) => ({ ...ERROR_STATE, data, message }));
        });
    },
    [action]
  );

  return [dataState, handleAction];
}
