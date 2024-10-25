import React from 'react';

import { DropZone } from '../composables/DropZone';
import { ViewElement } from '../context/elements';
import { useDropZone } from './hooks/useDropZone';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ControlProps } from './types';

export const DropZoneControl = ({
  className,
  children,
}: ControlProps & { children: React.ReactNode }): React.JSX.Element | null => {
  const { props } = useDropZone();

  const ResolvedDropZone = useResolvedComposable(DropZone, 'DropZone');

  return (
    <ViewElement className={className}>
      <ResolvedDropZone {...props}>{children}</ResolvedDropZone>
    </ViewElement>
  );
};
