import React from 'react';

import { Search } from '../composables/Search';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const SearchControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { onSearch, data } = useControlsContext();
  const { showIncludeSubfolders, searchPlaceholder } = data;
  const ResolvedSearch = useResolvedComposable(Search, 'Search');

  if (!onSearch) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedSearch
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        showIncludeSubfolders={showIncludeSubfolders}
      />
    </ViewElement>
  );
};
