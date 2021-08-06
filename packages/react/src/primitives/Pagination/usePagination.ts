import { useCallback, useReducer } from 'react';

import { UsePaginationProps, UsePaginationResult } from '../types/pagination';

enum ActionType {
  onNext = 'ON_NEXT',
  onPrevious = 'ON_PREVIOUS',
  onChange = 'ON_CHANGE',
}

interface Action {
  newPage?: number;
  type: ActionType;
}

interface State {
  currentPage: number;
}

const actionCreator = (type: ActionType, newPage?: number): Action => ({
  newPage,
  type,
});

const reducer = (state: State, action: Action): State => {
  const { type, newPage } = action;
  let { currentPage } = state;
  switch (type) {
    case ActionType.onNext:
      currentPage++;
      break;
    case ActionType.onPrevious:
      currentPage--;
      break;
    case ActionType.onChange:
      currentPage = newPage;
      break;
    default:
  }
  return { currentPage };
};

export const usePagination = (
  props: UsePaginationProps
): UsePaginationResult => {
  const { currentPage: initialPage, totalPages, siblingCount = 1 } = props;

  const initialState = { currentPage: initialPage };
  const [{ currentPage }, dispatch] = useReducer(reducer, initialState);

  const onNext = useCallback((newPage: number) => {
    dispatch(actionCreator(ActionType.onNext));
  }, []);

  const onPrevious = useCallback((newPage: number) => {
    dispatch(actionCreator(ActionType.onPrevious));
  }, []);

  const onChange = useCallback((newPage: number, prevPage: number) => {
    dispatch(actionCreator(ActionType.onChange, newPage));
  }, []);

  return {
    currentPage,
    totalPages,
    siblingCount,
    onNext,
    onPrevious,
    onChange,
  };
};
