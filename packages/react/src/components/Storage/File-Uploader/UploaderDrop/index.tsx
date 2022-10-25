import React from 'react';
import { Card, Flex } from '../../../../primitives';
import { UploaderDropProps } from '../types';
import { UploadIcon } from './UploadIcon';
import classNames from 'classnames';

export function UploaderDrop({
  children,
  inDropZone,
  getDropEvents,
}: UploaderDropProps): JSX.Element {
  return (
    <Card
      className={classNames(inDropZone && 'active', 'amplify-fileuploader')}
      {...getDropEvents}
    >
      <Flex className={classNames('amplify-fileuploader__dropzone')}>
        <UploadIcon className="amplify-fileuploader__dropzone__icon" />
        {children}
      </Flex>
    </Card>
  );
}
