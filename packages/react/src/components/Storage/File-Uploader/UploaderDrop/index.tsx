/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from 'src/primitives';
import { UploaderDropProps } from '../FileUploader/types';

export function UploaderDrop({
  children,
  inDropZone,
  getDropEvents,
}: UploaderDropProps): JSX.Element {
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
