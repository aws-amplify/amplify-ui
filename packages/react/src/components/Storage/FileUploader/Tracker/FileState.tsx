import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Text, Flex } from '../../../../primitives';
import { CheckIcon, ErrorIcon } from '../Previewer/PreviewerIcons';
import { FileStateProps } from '../types';

export const FileState = ({
  loading,
  success,
  error,
  paused,
  errorMessage,
}: FileStateProps): JSX.Element => {
  if (loading) return <Text className="">{translate('Loading')}</Text>;
  if (paused) return <Text className="">{translate('Paused')}</Text>;
  if (success)
    return (
      <Flex direction="row" gap="xxs" color="font.success">
        <CheckIcon fontSize="xl" /> {translate('Uploaded successfully')}
      </Flex>
    );
  if (error)
    return (
      <Flex direction="row" gap="xxs" color="font.error">
        <ErrorIcon fontSize="xl" />
        {errorMessage}
      </Flex>
    );

  return null;
};
