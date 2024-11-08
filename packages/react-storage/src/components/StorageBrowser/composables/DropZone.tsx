import React from 'react';
import { useDropZone } from '@aws-amplify/ui-react-core';

import { ViewElement } from '../context/elements';

import { CLASS_BASE } from '../views/constants';

export interface DropZoneProps {
  children: React.ReactNode;
  onDropFiles?: (files: File[]) => void;
}

export const DropZone = ({
  children,
  onDropFiles,
}: DropZoneProps): React.JSX.Element => {
  const { dragState, ...dropHandlers } = useDropZone({
    onDropComplete: ({ acceptedFiles }) => {
      onDropFiles?.(acceptedFiles);
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
