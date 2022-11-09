import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Text, ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileStateProps } from '../types';
import classNames from 'classnames';
import { classNameModifier } from '../../../../primitives/shared/utils';

export const FileState = ({
  fileState,
  errorMessage,
  percentage,
}: FileStateProps): JSX.Element => {
  switch (fileState) {
    case 'loading': {
      let text = translate('Uploading');
      if (percentage > 0) text = text + `: ${percentage}%`;
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {text}
        </Text>
      );
    }
    case 'paused':
      return (
        <Text className={ComponentClassNames.FileUploaderFileStatus}>
          {translate('Paused')}: {percentage}%
        </Text>
      );
    case 'success':
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
    case 'error':
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
