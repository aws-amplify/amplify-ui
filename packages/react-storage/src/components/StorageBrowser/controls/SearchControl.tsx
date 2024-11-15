import React from 'react';

import { SearchField } from '../composables/SearchField';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const SearchControl = (): React.JSX.Element | null => {
  const { data, onSearch, onSearchQueryChange, onSearchClear } =
    useControlsContext();
  const {
    searchPlaceholder,
    searchClearLabel,
    searchQuery,
    searchSubmitLabel,
  } = data;
  const ResolvedSearch = useResolvedComposable(SearchField, 'SearchField');

  return (
    <ResolvedSearch
      placeholder={searchPlaceholder}
      query={searchQuery}
      clearLabel={searchClearLabel}
      submitLabel={searchSubmitLabel}
      onSearch={onSearch}
      onQueryChange={onSearchQueryChange}
      onClear={onSearchClear}
    />
  );
};
