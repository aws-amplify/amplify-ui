import React from 'react';
import classNames from 'classnames';
import { UploaderDropProps } from '../types';
import { Card, Flex } from '../../../../primitives';
import { UploadIcon } from './UploadIcon';

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
