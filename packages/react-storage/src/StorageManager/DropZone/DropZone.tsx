import React from 'react';
import classNames from 'classnames';

import { View, ComponentClassNames, Text } from '@aws-amplify/ui-react';
import { IconUpload, classNameModifier } from '@aws-amplify/ui-react/internal';
import { DropZoneProps } from './types';

export function DropZone({
  inDropZone,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  displayText,
  children,
}: DropZoneProps): JSX.Element {
  const { dropFilesText } = displayText;

  return (
    <View
      className={classNames(
        inDropZone &&
          classNameModifier(
            ComponentClassNames.StorageManagerDropZone,
            'active'
          ),
        ComponentClassNames.StorageManagerDropZone
      )}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <IconUpload
        aria-hidden
        className={ComponentClassNames.StorageManagerDropZoneIcon}
      />
      <Text className={ComponentClassNames.StorageManagerDropZoneText}>
        {dropFilesText}
      </Text>
      {children}
    </View>
  );
}
