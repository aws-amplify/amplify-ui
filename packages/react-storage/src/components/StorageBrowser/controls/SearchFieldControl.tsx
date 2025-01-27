import React from 'react';

import { SearchField } from '../composables/SearchField';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useSearchField } from './hooks/useSearchField';

export const SearchFieldControl = (): React.JSX.Element => {
  const props = useSearchField();
  const Resolved = useResolvedComposable(SearchField, 'SearchField');

  return <Resolved {...props} />;
};
