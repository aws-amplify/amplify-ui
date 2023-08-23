import React from 'react';

import {
  View,
  ComponentClassNames,
  Text,
  DropZone as AmplifyDropZone,
} from '@aws-amplify/ui-react';
import { IconUpload, useIcons } from '@aws-amplify/ui-react/internal';
import { DropZoneProps } from './types';

export function DropZone({
  children,
  displayText,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  testId,
  isDragAccept = false,
  isDragActive = false,
  isDragReject = false,
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
  const value = React.useMemo(() => {
    return {
      isDragAccept,
      isDragReject,
      isDragActive,
    };
  }, [isDragAccept, isDragReject, isDragActive]);

  return (
    <AmplifyDropZone.Provider value={value}>
      <AmplifyDropZone.Container
        {...props}
        className={ComponentClassNames.StorageManagerDropZone}
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
      </AmplifyDropZone.Container>
    </AmplifyDropZone.Provider>
  );
}
