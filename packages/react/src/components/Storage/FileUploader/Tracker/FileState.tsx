import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Text, ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import { FileStateProps } from '../types';
import classNames from 'classnames';
import { classNameModifier } from 'src/primitives/shared/utils';

export const FileState = ({
  loading,
  success,
  error,
  paused,
  errorMessage,
  percentage,
}: FileStateProps): JSX.Element => {
  if (loading)
    return (
      <Text className={ComponentClassNames.FileUploaderFileStatus}>
        {translate('Loading')}: {percentage}%
      </Text>
    );
  if (paused)
    return (
      <Text className={ComponentClassNames.FileUploaderFileStatus}>
        {translate('Paused')}: {percentage}%
      </Text>
    );
  if (success)
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
  if (error)
    return (
      <Text
        className={classNames(
          ComponentClassNames.FileUploaderFileStatus,
          classNameModifier(ComponentClassNames.FileUploaderFileStatus, 'error')
        )}
      >
        <IconError fontSize="xl" /> {errorMessage}
      </Text>
    );

  return null;
};
