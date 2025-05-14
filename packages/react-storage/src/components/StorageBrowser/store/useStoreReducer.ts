import { useControlledReducer } from '@aws-amplify/ui-react-core';

import storeReducer from './storeReducer';
import type { StoreProviderProps, StoreState, StoreContextType } from './types';
import { getState, getInitialState } from './utils';
import validateStoreProps from './validateStoreProps';

export default function useStoreReducer(
  props: StoreProviderProps
): StoreContextType {
  validateStoreProps(props);

  const { defaultValue, onValueChange, value, ...legacyProps } = props;

  const initialState = getInitialState(defaultValue, legacyProps);
  const controlledState = value !== undefined ? getState(value) : undefined;

  const onStateChange = ({
    actionType,
    location: { current, path },
  }: StoreState) => {
    const location = !current ? undefined : { ...current, path };

    onValueChange?.({ actionType, location });
  };

  return useControlledReducer(storeReducer, initialState, {
    controlledState,
    onStateChange,
  });
}
