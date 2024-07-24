import React from 'react';

type SearchAction = { type: 'START'; searchValue: string } | { type: 'DONE' };

export interface SearchState {
  hasError: boolean;
  isSearching: boolean;
  // read from HTML `form` control
  readonly getValue: () => string;
  readonly includeSubfolders: () => boolean;
}

export type SearchStateContext = [
  state: SearchState,
  handleUpdateState: (action: SearchAction) => void,
];

const INITIAL_STATE: SearchState = {
  hasError: false,
  isSearching: false,
  getValue: () => {
    // TODO: read from the HTML `form` control
    return '';
  },
  includeSubfolders: () => {
    // TODO: read from HTML `form` control
    return false;
  },
};

export function searchReducer(
  state: SearchState,
  _action: SearchAction
): SearchState {
  return state;
}

export const SearchContext = React.createContext<
  SearchStateContext | undefined
>(undefined);

export function SearchProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
