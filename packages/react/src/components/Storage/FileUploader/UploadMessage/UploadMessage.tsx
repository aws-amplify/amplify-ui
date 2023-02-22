import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Text, ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileState, FileStateProps } from '../types';
import classNames from 'classnames';
import { classNameModifier } from '../../../../primitives/shared/utils';

export const UploadMessage = ({
  fileState,
  errorMessage,
  percentage,
}: FileStateProps): JSX.Element => {
  switch (fileState) {
    case FileState.LOADING: {
      const text =
        percentage > 0
          ? `${translate('Uploading')}: ${percentage}%`
          : translate('Uploading');
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {text}
        </Text>
      );
    }
    case FileState.PAUSED:
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {translate('Paused')}: {percentage}%
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
          <IconCheck fontSize="xl" /> {translate('Uploaded successfully')}
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
