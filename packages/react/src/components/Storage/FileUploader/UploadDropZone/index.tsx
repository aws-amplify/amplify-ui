/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from '../../../../primitives';
import { UploadDropZoneProps } from '../types';

export function UploadDropZone({
  children,
  inDropZone,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
}: UploadDropZoneProps): JSX.Element {
  return <Card>{children}</Card>;
}
