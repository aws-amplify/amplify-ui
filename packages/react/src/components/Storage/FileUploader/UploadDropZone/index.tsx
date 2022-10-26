import React from 'react';
import classNames from 'classnames';
import { UploadDropZoneProps } from '../types';
import { Card, Flex } from '../../../../primitives';
import { UploadIcon } from './UploadIcon';

export function UploadDropZone({
  children,
  inDropZone,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
}: UploadDropZoneProps): JSX.Element {
  return (
    <Card
      className={classNames(inDropZone && 'active', 'amplify-fileuploader')}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Flex className={classNames('amplify-fileuploader__dropzone')}>
        <UploadIcon className="amplify-fileuploader__dropzone__icon" />
        {children}
      </Flex>
    </Card>
  );
}
