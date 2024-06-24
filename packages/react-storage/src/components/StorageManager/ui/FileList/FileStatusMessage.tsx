import React from 'react';
import { storageManagerClasses } from '@aws-amplify/ui';

import { Text, View } from '@aws-amplify/ui-react';
import { IconCheck, IconError, useIcons } from '@aws-amplify/ui-react/internal';
import { FileStatus } from '../../types';
import { FileStatusMessageProps } from './types';

export const FileStatusMessage = ({
  errorMessage,
  getPausedText,
  getUploadingText,
  percentage,
  status,
  uploadSuccessfulText,
}: FileStatusMessageProps): JSX.Element | null => {
  const icons = useIcons('storageManager');
  switch (status) {
    case FileStatus.UPLOADING: {
      return (
        <Text className={storageManagerClasses({ _element: 'file__status' })}>
          {getUploadingText(percentage)}
        </Text>
      );
    }
    case FileStatus.PAUSED:
      return (
        <Text className={storageManagerClasses({ _element: 'file__status' })}>
          {getPausedText(percentage)}
        </Text>
      );
    case FileStatus.UPLOADED:
      return (
        <Text
          className={storageManagerClasses({
            _element: {
              file__status: 'success',
            },
          })}
        >
          <View as="span" fontSize="xl">
            {icons?.success ?? <IconCheck />}
          </View>
          {uploadSuccessfulText}
        </Text>
      );
    case FileStatus.ERROR:
      return (
        <Text
          className={storageManagerClasses({
            _element: {
              file__status: 'error',
            },
          })}
        >
          <View as="span" fontSize="xl">
            {icons?.error ?? <IconError />}
          </View>
          {errorMessage}
        </Text>
      );
    default:
      return null;
  }
};
