import React from 'react';

import { SearchField } from '../composables/SearchField';

import { useControlsContext } from './context';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const SearchControl = (): React.JSX.Element => {
  const { data, onSearch, onSearchQueryChange, onSearchClear } =
    useControlsContext();
  const {
    searchPlaceholder,
    searchClearLabel,
    searchQuery,
    searchSubmitLabel,
  } = data;
  const Resolved = useResolvedComposable(SearchField, 'SearchField');

  return (
    <Resolved
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
