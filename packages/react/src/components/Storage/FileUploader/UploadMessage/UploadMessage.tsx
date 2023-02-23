import React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../../../../primitives/shared/utils';
import { Text, ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileState } from '../types';
import { UploadMessageProps } from './types';

export const UploadMessage = ({
  fileState,
  errorMessage,
  percentage,
  displayText,
}: UploadMessageProps): JSX.Element => {
  switch (fileState) {
    case FileState.LOADING: {
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {displayText.uploading(percentage)}
        </Text>
      );
    }
    case FileState.PAUSED:
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {displayText.paused(percentage)}
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
          <IconCheck fontSize="xl" /> {displayText.uploadSuccessful}
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
