/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from 'src/primitives';
import { FileUploaderTransferProps } from '../FileUploader/types';

export function FileUploaderDrop({
  children,
  inDropZone,
  getDropEvents,
}: FileUploaderTransferProps): JSX.Element {
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
