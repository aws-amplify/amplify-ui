import React from 'react';

type Direction = 'ASCENDING' | 'DESCENDING';

type TableAction =
  | { type: 'CHANGE_SORT_DIRECTION'; directionType: Direction }
  | { type: 'CHANGE_SORT_SELECTION'; selection: string };

export interface TableState<T> {
  // reads:
  // - parent control
  //  - pageSize
  //  - currentPage
  // - summary for tasks
  data: T | undefined;
  selected: T[] | undefined;
  sort: { direction: Direction; selection: string };
}

export type TableStateContext = [
  state: TableState<any>,
  handleUpdateState: (action: TableAction) => void,
];

const INITIAL_STATE: TableState<any> = {
  data: undefined,
  selected: undefined,
  sort: {
    direction: 'DESCENDING',
    selection: '',
  },
};

export function tableReducer(
  state: TableState<any>,
  _action: TableAction
): TableState<any> {
  return state;
}

export const TableContext = React.createContext<TableStateContext | undefined>(
  undefined
);

export function TableProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(tableReducer, INITIAL_STATE);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}
