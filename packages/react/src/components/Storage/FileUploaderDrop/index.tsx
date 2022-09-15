/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from 'src/primitives';
import { FileUploaderTransferProps } from '../FileUploader/types';
import { useFileUploader } from '../hooks/useFileUploader';

export function FileUploaderDrop({
  children,
}: FileUploaderTransferProps): JSX.Element {
  const { inDropZone, getDropEvents } = useFileUploader();
  // https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/

  return (
    <Card
      data-amplify-file-uploader
      className={inDropZone ? 'inside-drag-area' : ''}
      border={'dashed rgb(7,115,152)'}
      {...getDropEvents}
    >
      {children}
    </Card>
  );
}
