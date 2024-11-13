import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { AddFolder } from '../composables/AddFolder';
import { useAddFolder } from './hooks/useAddFolder';
import { ViewElement } from '../context/elements';

export const AddFolderControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useAddFolder();
  const ResolvedAddFolder = useResolvedComposable(AddFolder, 'AddFolder');

  return (
    <ViewElement className={className}>
      <ResolvedAddFolder {...props} />
    </ViewElement>
  );
};
