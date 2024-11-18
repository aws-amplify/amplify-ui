import React from 'react';

import { AddFolder } from '../composables/AddFolder';

import { useAddFolder } from './hooks/useAddFolder';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const AddFolderControl = (): React.JSX.Element => {
  const props = useAddFolder();
  const Resolved = useResolvedComposable(AddFolder, 'AddFolder');

  return <Resolved {...props} />;
};
