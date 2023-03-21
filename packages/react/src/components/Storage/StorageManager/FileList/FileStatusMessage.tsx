import React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../../../../primitives/shared/utils';
import { Text, ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileState } from '../types';
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
    case FileState.LOADING: {
      return (
        <Text className={ComponentClassNames.StorageManagerFileStatus}>
          {getUploadingText(percentage)}
        </Text>
      );
    }
    case FileState.PAUSED:
      return (
        <Text className={ComponentClassNames.StorageManagerFileStatus}>
          {getPausedText(percentage)}
        </Text>
      );
    case FileState.SUCCESS:
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
    case FileState.ERROR:
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
