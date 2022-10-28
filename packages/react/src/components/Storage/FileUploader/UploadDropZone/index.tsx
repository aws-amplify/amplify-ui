import React from 'react';
import classNames from 'classnames';
import { UploadDropZoneProps } from '../types';
import { View, ComponentClassNames } from '../../../../primitives';
import { classNameModifier } from 'src/primitives/shared/utils';
import { IconUpload } from 'src/internal';

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
    <View
      className={classNames(
        inDropZone &&
          classNameModifier(ComponentClassNames.FileUploaderDropZone, 'active'),
        ComponentClassNames.FileUploaderDropZone
      )}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <IconUpload className={ComponentClassNames.FileUploaderDropZoneIcon} />
      {children}
    </View>
  );
}
