/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from '../../../../primitives';
import { UploaderDropProps } from '../types';

export function UploaderDrop({
  children,
  inDropZone,
  getDropEvents,
}: UploaderDropProps): JSX.Element {
  return <Card>{children}</Card>;
}
