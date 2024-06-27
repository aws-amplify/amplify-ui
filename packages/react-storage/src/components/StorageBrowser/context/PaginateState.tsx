import React from 'react';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

export interface PaginateAction {
  pagesLength: number;
  pageSize: number;
  type: 'next' | 'previous';
}

export interface PaginateState {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  page: number;
}

const updatePaginateStateAction = (
  { page: prevPage }: PaginateState,
  { pagesLength, pageSize, type }: PaginateAction
): PaginateState => {
  switch (type) {
    case 'next': {
      const hasNextPage = pageSize * prevPage - pagesLength > pageSize;
      const page = hasNextPage ? prevPage + 1 : prevPage;
      return { hasNextPage, hasPreviousPage: true, page };
    }
    case 'previous': {
      const hasNextPage = prevPage > 2;
      const page = hasNextPage ? prevPage - 1 : prevPage;
      return { hasNextPage, hasPreviousPage: page > 1, page };
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

type UseStorageBrowser = (
  action: 'locations-list'
) => [{ data: { nextToken: string | undefined } }, (input: any) => void];

const useStorageBrowser = null as unknown as UseStorageBrowser;

export const PaginateStateProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [{ data }] = useStorageBrowser('locations-list');

  const state = useDataState(updatePaginateStateAction, {
    hasNextPage: !!data.nextToken,
    page: 1,
    hasPreviousPage: true,
  });

  return (
    <PaginateStateContext.Provider value={state}>
      {children}
    </PaginateStateContext.Provider>
  );
};
