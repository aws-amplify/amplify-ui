import React from 'react';

import { SearchSubfoldersToggle } from '../composables/SearchSubfoldersToggle';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useSearchSubfoldersToggle } from './hooks/useSearchSubfoldersToggle';

export const SearchSubfoldersToggleControl = (): React.JSX.Element => {
  const props = useSearchSubfoldersToggle();
  const Resolved = useResolvedComposable(
    SearchSubfoldersToggle,
    'SearchSubfoldersToggle'
  );

  return <Resolved {...props} />;
};
