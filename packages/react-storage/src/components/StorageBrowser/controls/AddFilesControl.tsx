import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { AddFiles } from '../composables/AddFiles';
import { useAddFiles } from './hooks/useAddFiles';
import { ViewElement } from '../context/elements';

export const AddFilesControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useAddFiles();
  const ResolvedAddFiles = useResolvedComposable(AddFiles, 'AddFiles');

  return (
    <ViewElement className={className}>
      <ResolvedAddFiles {...props} />
    </ViewElement>
  );
};
