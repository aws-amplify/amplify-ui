import React from 'react';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

export interface PaginateAction {
  hasAdditionalData: boolean;
  loadedDataSize: number;
  lookAhead: number;
  pageSize: number;
  type: 'next' | 'previous';
}

export interface PaginateState {
  hasNext: boolean;
  hasPrevious: boolean;
  current: number;
  shouldPaginate: boolean;
}

interface PaginateStateProviderProps {
  children?: React.ReactNode;
  initialState: PaginateState;
  lookAhead: number;
  pageSize: number;
}

export const updatePaginateStateAction = (
  { current: _current }: PaginateState,
  {
    hasAdditionalData,
    lookAhead,
    loadedDataSize,
    pageSize,
    type,
  }: PaginateAction
): PaginateState => {
  switch (type) {
    case 'next': {
      const prevDisplaySizeLimit = pageSize * _current;
      const nextDisplaySizeLimit = pageSize * (_current + 1);

      const shouldPaginate =
        hasAdditionalData && nextDisplaySizeLimit < loadedDataSize;

      const hasNext =
        shouldPaginate ||
        loadedDataSize - prevDisplaySizeLimit > pageSize * lookAhead;

      const current = hasNext ? _current + 1 : _current;
      const hasPrevious = current >= 2;

      return { current, hasNext, hasPrevious, shouldPaginate };
    }
    case 'previous': {
      const hasNext = _current >= 2;
      const current = hasNext ? _current - 1 : _current;
      const hasPrevious = current > 1;
      return { current, hasNext, hasPrevious, shouldPaginate: false };
    }
    default:
      throw new Error(`Invalid value of ${type} provided as \`type\``);
  }
};

export type UsePaginateState = [
  ActionState<PaginateState>,
  (input: PaginateAction) => void,
];

const PaginateStateContext = React.createContext<UsePaginateState | undefined>(
  undefined
);

export const usePaginateState = (): UsePaginateState => {
  const context = React.useContext(PaginateStateContext);
  if (!context) throw new Error('Must be called inside PROVIDER_NAME_HERE');
  return context;
};

export const PaginateStateProvider = ({
  children,
  initialState,
  lookAhead,
  pageSize,
}: PaginateStateProviderProps): JSX.Element => {
  const state = useDataState(
    (
      prev: PaginateState,
      action: Omit<PaginateAction, 'lookAhead' | 'pageSize'>
    ) => updatePaginateStateAction(prev, { ...action, lookAhead, pageSize }),
    initialState
  );

  return (
    <PaginateStateContext.Provider value={state}>
      {children}
    </PaginateStateContext.Provider>
  );
};
