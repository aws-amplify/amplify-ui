import React from 'react';
import classNames from 'classnames';

import {
  Text,
  ComponentClassNames,
  useIcons,
  View,
} from '@aws-amplify/ui-react';
import { IconCheck, IconError } from '@aws-amplify/ui-react/internal';
import { classNameModifier } from '@aws-amplify/ui';
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
  const icons = useIcons();
  switch (status) {
    case FileStatus.UPLOADING: {
      return (
        <Text className={ComponentClassNames.StorageManagerFileStatus}>
          {getUploadingText(percentage)}
        </Text>
      );
    }
    case FileStatus.PAUSED:
      return (
        <Text className={ComponentClassNames.StorageManagerFileStatus}>
          {getPausedText(percentage)}
        </Text>
      );
    case FileStatus.UPLOADED:
      return (
        <Text
          className={classNames(
            ComponentClassNames.StorageManagerFileStatus,
            classNameModifier(
              ComponentClassNames.StorageManagerFileStatus,
              'success'
            )
          )}
        >
          <View as="span" fontSize="xl">
            {icons?.storageManager?.success ?? <IconCheck />}
          </View>
          {uploadSuccessfulText}
        </Text>
      );
    case FileStatus.ERROR:
      return (
        <Text
          className={classNames(
            ComponentClassNames.StorageManagerFileStatus,
            classNameModifier(
              ComponentClassNames.StorageManagerFileStatus,
              'error'
            )
          )}
        >
          <View as="span" fontSize="xl">
            {icons?.storageManager?.error ?? <IconError />}
          </View>
          {errorMessage}
        </Text>
      );
    default:
      return null;
  }
};
