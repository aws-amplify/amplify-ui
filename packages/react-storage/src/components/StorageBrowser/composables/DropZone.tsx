import React from 'react';
import { useDropZone } from '@aws-amplify/ui-react-core';

import { ViewElement } from '../context/elements';

import { STORAGE_BROWSER_BLOCK } from '../constants';

export interface DropZoneProps {
  acceptedFileTypes?: string[];
  children?: React.ReactNode;
  onDropFiles?: (files: File[]) => void;
}

export const DropZone = ({
  acceptedFileTypes,
  children,
  onDropFiles,
}: DropZoneProps): React.JSX.Element => {
  const { dragState, ...dropHandlers } = useDropZone({
    acceptedFileTypes,
    onDropComplete: ({ acceptedFiles }) => {
      onDropFiles?.(acceptedFiles);
    },
  });
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK}__drop-zone ${STORAGE_BROWSER_BLOCK}__drop-zone${
        dragState !== 'inactive' ? '--active' : ''
      }`}
      {...dropHandlers}
    >
      {children}
    </ViewElement>
  );
};
