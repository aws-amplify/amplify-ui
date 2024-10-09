import React from 'react';
import { ViewElement, ViewElementProps } from './definitions';
import { useDropZone } from '@aws-amplify/ui-react-core';
import { CLASS_BASE } from '../../views/constants';

export interface DropZoneElementProps extends ViewElementProps {
  handleDroppedFiles: (files: File[]) => void;
}

export const DropZoneElement = ({
  children,
  handleDroppedFiles,
}: DropZoneElementProps): React.ReactElement => {
  const [isDragging, setIsDragging] = React.useState(false);

  const { dragState, ...dropHandlers } = useDropZone({
    acceptedFileTypes: [],
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropComplete: ({ acceptedFiles }) => {
      setIsDragging(false);
      handleDroppedFiles(acceptedFiles);
    },
  });

  return (
    <ViewElement
      {...dropHandlers}
      data-testId="dropzone"
      className={`${CLASS_BASE}__drag-drop-container${
        isDragging ? '__outlined' : ''
      }`}
    >
      {children}
    </ViewElement>
  );
};
