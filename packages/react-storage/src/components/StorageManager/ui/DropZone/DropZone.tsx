import React from 'react';
import { storageManagerClasses } from '@aws-amplify/ui';

import { View, Text } from '@aws-amplify/ui-react';
import { IconUpload, useIcons } from '@aws-amplify/ui-react/internal';
import { DropZoneProps } from './types';

export function DropZone({
  children,
  displayText,
  inDropZone,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  testId,
}: DropZoneProps): JSX.Element {
  const { dropFilesText } = displayText;
  const icons = useIcons('storageManager');

  return (
    <View
      className={storageManagerClasses({
        _element: {
          dropzone: {
            active: inDropZone,
          },
        },
      })}
      data-testid={testId}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <View
        as="span"
        aria-hidden
        className={storageManagerClasses({
          _element: 'dropzone__icon',
        })}
      >
        {icons?.upload ?? <IconUpload />}
      </View>

      <Text className={storageManagerClasses({ _element: 'dropzone__text' })}>
        {dropFilesText}
      </Text>
      {children}
    </View>
  );
}
