import React from 'react';
import { isUndefined } from '@aws-amplify/ui';

import useHasValueUpdated from './useHasValueUpdated';

export default function useControlledReducer<
  R extends React.Reducer<any, any>,
  S extends React.ReducerState<R>,
>(
  reducer: R,
  initialState: S,
  options?: {
    controlledState?: S;
    onStateChange?: (state: S) => void;
  }
): [S, React.Dispatch<React.ReducerAction<R>>] {
  const { controlledState, onStateChange } = options ?? {};

  const [uncontrolledState, dispatch] = React.useReducer(
    reducer,
    controlledState ?? initialState
  );

  const controlledStateRef = React.useRef<S | undefined>();
  if (!isUndefined(controlledState)) {
    controlledStateRef.current = controlledState;
  }

  const hasUncontrolledStateChanged = useHasValueUpdated(
    uncontrolledState,
    true
  );
  React.useEffect(() => {
    // only run `onStateChange` if `uncontrolledState` has changed,
    // ignore reference change to `onStateChange`
    if (hasUncontrolledStateChanged) {
      onStateChange?.(uncontrolledState);
    }
  }, [hasUncontrolledStateChanged, onStateChange, uncontrolledState]);

  const state = controlledStateRef.current
    ? controlledStateRef.current
    : uncontrolledState;

  return React.useMemo(() => [state, dispatch], [state]);
}
