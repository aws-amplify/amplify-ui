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
}: FileStatusMessageProps): JSX.Element => {
  switch (status) {
    case FileState.LOADING: {
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {getUploadingText(percentage)}
        </Text>
      );
    }
    case FileState.PAUSED:
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {getPausedText(percentage)}
        </Text>
      );
    case FileState.SUCCESS:
      return (
        <Text
          className={classNames(
            ComponentClassNames.FileUploaderFileStatus,
            classNameModifier(
              ComponentClassNames.FileUploaderFileStatus,
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
            ComponentClassNames.FileUploaderFileStatus,
            classNameModifier(
              ComponentClassNames.FileUploaderFileStatus,
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
