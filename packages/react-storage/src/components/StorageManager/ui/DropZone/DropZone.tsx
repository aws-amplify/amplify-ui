import React from 'react';
import classNames from 'classnames';

import {
  View,
  ComponentClassNames,
  Text,
  DropZone as AmplifyDropZone,
} from '@aws-amplify/ui-react';
import { IconUpload, useIcons } from '@aws-amplify/ui-react/internal';
import { DropZoneProps } from './types';
import { classNameModifierByFlag } from '@aws-amplify/ui';

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
  const props = {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
  };

  return (
    <AmplifyDropZone
      {...props}
      className={classNames(
        classNameModifierByFlag(
          ComponentClassNames.StorageManagerDropZone,
          'active',
          inDropZone
        ),
        ComponentClassNames.StorageManagerDropZone
      )}
      testId={testId}
    >
      <View
        as="span"
        aria-hidden
        className={ComponentClassNames.StorageManagerDropZoneIcon}
      >
        {icons?.upload ?? <IconUpload />}
      </View>

      <Text className={ComponentClassNames.StorageManagerDropZoneText}>
        {dropFilesText}
      </Text>
      {children}
    </AmplifyDropZone>
  );
}
