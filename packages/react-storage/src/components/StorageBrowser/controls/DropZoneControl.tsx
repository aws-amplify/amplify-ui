import React from 'react';

import { DropZone } from '../composables/DropZone';

import { useDropZone } from './hooks/useDropZone';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const DropZoneControl = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const props = useDropZone();

  const Resolved = useResolvedComposable(DropZone, 'DropZone');

  return <Resolved {...props}>{children}</Resolved>;
};
