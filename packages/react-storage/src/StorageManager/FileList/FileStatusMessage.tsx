import React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../../../../primitives/shared/utils';
import { Text, ComponentClassNames } from '@aws-amplify/ui-react';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileStatus } from '../types';
import { FileStatusMessageProps } from './types';

export const FileStatusMessage = ({
  errorMessage,
  getPausedText,
  getUploadingText,
  percentage,
  status,
  uploadSuccessfulText,
}: FileStatusMessageProps): JSX.Element | null => {
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
          <IconCheck fontSize="xl" /> {uploadSuccessfulText}
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
          <IconError fontSize="xl" /> {errorMessage}
        </Text>
      );
    default:
      return null;
  }
};
