import React from 'react';

import { FolderNameField } from '../composables/FolderNameField';

import { useFolderNameField } from './hooks/useFolderNameField';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const FolderNameFieldControl = (): React.JSX.Element => {
  const props = useFolderNameField();

  const Resolved = useResolvedComposable(FolderNameField, 'FolderNameField');

  return <Resolved {...props} />;
};
