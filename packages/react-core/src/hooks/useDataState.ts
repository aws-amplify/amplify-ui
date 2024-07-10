import React from 'react';

interface ActionState<T> {
  data: T;
  isLoading: boolean;
  message: string | undefined;
}

const getActionState = <T>(data: T): ActionState<T> => ({
  data,
  isLoading: false,
  message: undefined,
});

export default function useDataState<T, K>(
  action: (prevData: Awaited<T>, ...input: K[]) => T | Promise<T>,
  initialData: Awaited<T>
): [state: ActionState<Awaited<T>>, handleAction: (...input: K[]) => void] {
  const [actionState, setActionState] = React.useState<ActionState<Awaited<T>>>(
    () => getActionState(initialData)
  );

  const prevData = React.useRef(initialData);

  const handleAction: (...input: K[]) => void = React.useCallback(
    (...input) => {
      setActionState((prev) => ({ ...prev, isLoading: true }));

      Promise.resolve(action(prevData.current, ...input))
        .then((data) => {
          prevData.current = data;
          setActionState(getActionState(data));
        })
        .catch(({ message }: Error) => {
          setActionState((prev) => ({ ...prev, isLoading: false, message }));
        });
    },
    [action]
  );

  return [actionState, handleAction];
}
