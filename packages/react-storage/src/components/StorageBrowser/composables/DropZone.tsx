import React from 'react';
import { useDropZone } from '@aws-amplify/ui-react-core';

import { ViewElement } from '../context/elements';

import { CLASS_BASE } from '../views/constants';

export interface DropZoneProps {
  children: React.ReactNode;
  onDropComplete?: (files: File[]) => void;
}

export const DropZone = ({
  children,
  onDropComplete,
}: DropZoneProps): React.JSX.Element => {
  const { dragState, ...dropHandlers } = useDropZone({
    onDropComplete: ({ acceptedFiles }) => {
      onDropComplete?.(acceptedFiles);
    },
  });
  return (
    <ViewElement
      className={`${CLASS_BASE}__drop-zone${
        dragState !== 'inactive' ? '--active' : ''
      }`}
      {...dropHandlers}
    >
      {children}
    </ViewElement>
  );
};
