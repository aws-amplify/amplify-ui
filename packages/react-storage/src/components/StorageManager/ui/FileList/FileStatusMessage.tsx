import React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { Text, View } from '@aws-amplify/ui-react';
import { IconCheck, IconError, useIcons } from '@aws-amplify/ui-react/internal';
import { classNameModifier } from '@aws-amplify/ui';
import { FileStatus } from '../../../FileUploader/types';
import type { FileStatusMessageProps } from './types';

export const FileStatusMessage = ({
  errorMessage,
  getPausedText,
  getUploadingText,
  percentage,
  status,
  uploadSuccessfulText,
}: FileStatusMessageProps): React.JSX.Element | null => {
  const icons = useIcons('storageManager');
  switch (status) {
    case FileStatus.UPLOADING: {
      return (
        <Text className={ComponentClassName.StorageManagerFileStatus}>
          {getUploadingText(percentage)}
        </Text>
      );
    }
    case FileStatus.PAUSED:
      return (
        <Text className={ComponentClassName.StorageManagerFileStatus}>
          {getPausedText(percentage)}
        </Text>
      );
    case FileStatus.UPLOADED:
      return (
        <Text
          className={classNames(
            ComponentClassName.StorageManagerFileStatus,
            classNameModifier(
              ComponentClassName.StorageManagerFileStatus,
              'success'
            )
          )}
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
          className={classNames(
            ComponentClassName.StorageManagerFileStatus,
            classNameModifier(
              ComponentClassName.StorageManagerFileStatus,
              'error'
            )
          )}
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
