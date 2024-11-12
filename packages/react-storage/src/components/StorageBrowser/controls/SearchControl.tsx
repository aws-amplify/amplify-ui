import React from 'react';

import { Search } from '../composables/Search';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const SearchControl = ({
  className,
  children,
}: ControlProps & { children?: React.ReactNode }): React.JSX.Element | null => {
  const { data, onSearch, onSearchQueryChange, onSearchClear } =
    useControlsContext();
  const { searchPlaceholder, searchQuery } = data;
  const ResolvedSearch = useResolvedComposable(Search, 'Search');

  return (
    <ViewElement className={className}>
      <ResolvedSearch
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSearchClear={onSearchClear}
      >
        {children ?? null}
      </ResolvedSearch>
    </ViewElement>
  );
};
