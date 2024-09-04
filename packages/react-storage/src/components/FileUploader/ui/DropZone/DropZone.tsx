import React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Text } from '@aws-amplify/ui-react';
import { classNameModifier } from '@aws-amplify/ui';
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
      className={classNames(
        inDropZone &&
          classNameModifier(ComponentClassName.FileUploaderDropZone, 'active'),
        ComponentClassName.FileUploaderDropZone
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
        className={ComponentClassName.FileUploaderDropZoneIcon}
      >
        {icons?.upload ?? <IconUpload />}
      </View>

      <Text className={ComponentClassName.FileUploaderDropZoneText}>
        {dropFilesText}
      </Text>
      {children}
    </View>
  );
}
