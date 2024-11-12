import React from 'react';

import { DropZone } from '../composables/DropZone';
import { useDropZone } from './hooks/useDropZone';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const DropZoneControl = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element | null => {
  const props = useDropZone();

  const ResolvedDropZone = useResolvedComposable(DropZone, 'DropZone');

  return <ResolvedDropZone {...props}>{children}</ResolvedDropZone>;
};
