import React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Text } from '@aws-amplify/ui-react';
import { classNameModifier } from '@aws-amplify/ui';
import { IconUpload, useIcons } from '@aws-amplify/ui-react/internal';
import type { DropZoneProps } from './types';

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
}: DropZoneProps): React.JSX.Element {
  const { dropFilesText } = displayText;
  const icons = useIcons('storageManager');

  return (
    <View
      className={classNames(
        inDropZone &&
          classNameModifier(
            ComponentClassName.StorageManagerDropZone,
            'active'
          ),
        ComponentClassName.StorageManagerDropZone
      )}
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
        className={ComponentClassName.StorageManagerDropZoneIcon}
      >
        {icons?.upload ?? <IconUpload />}
      </View>

      <Text className={ComponentClassName.StorageManagerDropZoneText}>
        {dropFilesText}
      </Text>
      {children}
    </View>
  );
}
