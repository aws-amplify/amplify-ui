import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { SearchSubfoldersToggle } from '../composables/SearchSubfoldersToggle';
import { useSearchSubfoldersToggle } from './hooks/useSearchSubfoldersToggle';
import { ViewElement } from '../context/elements';

export const SearchSubfoldersToggleControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useSearchSubfoldersToggle();
  const ResolvedSearchSubfoldersToggle = useResolvedComposable(
    SearchSubfoldersToggle,
    'SearchSubfoldersToggle'
  );

  return (
    <ViewElement className={className}>
      <ResolvedSearchSubfoldersToggle {...props} />
    </ViewElement>
  );
};
