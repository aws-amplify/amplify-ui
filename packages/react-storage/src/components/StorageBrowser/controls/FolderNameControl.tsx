import React from 'react';

import { FolderName } from '../composables/FolderName';
import { ViewElement } from '../context/elements';
import { useFolderName } from './hooks/useFolderName';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ControlProps } from './types';

export const FolderNameControl = ({
  className,
  children,
}: ControlProps & { children: React.ReactNode }): React.JSX.Element | null => {
  const props = useFolderName();

  const ResolvedFolderName = useResolvedComposable(FolderName, 'FolderName');

  return (
    <ViewElement className={className}>
      <ResolvedFolderName {...props}>{children}</ResolvedFolderName>
    </ViewElement>
  );
};
