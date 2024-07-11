import React from 'react';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

export type PaginateAction =
  | { type: 'setStatus'; isPaginating: boolean }
  | { hasNextToken: boolean; itemCount: number; type: 'next' }
  | { type: 'previous' };

export interface PaginateState {
  current: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isPaginating: boolean;
  shouldPaginate: boolean;
  // top level config propeeties
  readonly lookAhead: number;
  readonly pageSize: number;
}

interface PaginateStateProviderProps {
  children?: React.ReactNode;
  initialState: PaginateState;
}

export const updatePaginateStateAction = (
  prevState: PaginateState,
  action: PaginateAction
): PaginateState => {
  switch (action.type) {
    case 'next': {
      const { lookAhead, pageSize, current: _current } = prevState;
      const { hasNextToken, itemCount } = action;
      const prevDisplaySizeLimit = pageSize * _current;
      const nextDisplaySizeLimit = pageSize * (_current + 1);

      const shouldPaginate = hasNextToken && nextDisplaySizeLimit < itemCount;

      const hasNext =
        shouldPaginate ||
        itemCount - prevDisplaySizeLimit > pageSize * lookAhead;

      const current = hasNext ? _current + 1 : _current;
      const hasPrevious = current >= 2;

      return {
        current,
        hasNext,
        hasPrevious,
        isPaginating: false,
        lookAhead,
        pageSize,
        shouldPaginate,
      };
    }
    case 'previous': {
      const { current: _current, ...nextState } = prevState;
      const hasNext = _current >= 2;
      const current = hasNext ? _current - 1 : _current;
      const hasPrevious = current > 1;
      return {
        ...nextState,
        current,
        hasNext,
        hasPrevious,
        isPaginating: false,
        shouldPaginate: false,
      };
    }
    case 'setStatus': {
      const { isPaginating } = action;
      return { ...prevState, isPaginating };
    }
    default:
      // @ts-expect-error
      throw new Error(`Invalid value of ${action.type} provided as \`type\``);
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
}: PaginateStateProviderProps): JSX.Element => {
  const state = useDataState(
    (prev: PaginateState, action: PaginateAction) =>
      updatePaginateStateAction(prev, action),
    initialState
  );

  return (
    <PaginateStateContext.Provider value={state}>
      {children}
    </PaginateStateContext.Provider>
  );
};
