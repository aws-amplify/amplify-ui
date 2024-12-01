import React from 'react';

import { AddFiles } from '../composables/AddFiles';

import { useAddFiles } from './hooks/useAddFiles';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const AddFilesControl = (): React.JSX.Element => {
  const props = useAddFiles();
  const Resolved = useResolvedComposable(AddFiles, 'AddFiles');

  return <Resolved {...props} />;
};
