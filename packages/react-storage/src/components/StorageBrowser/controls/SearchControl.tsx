import React from 'react';

import { Search } from '../composables/Search';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const SearchControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { data } = useControlsContext();

  const ResolvedSearch = useResolvedComposable(Search, 'Search');

  if (!data?.onSearch) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedSearch onSearch={data.onSearch} />
    </ViewElement>
  );
};
