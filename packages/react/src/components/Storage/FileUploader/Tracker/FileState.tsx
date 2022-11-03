import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Text, Flex } from '../../../../primitives';
import { CheckIcon, ErrorIcon } from '../Previewer/PreviewerIcons';
import { FileStateProps } from '../types';

export const FileState = ({
  fileState,
  isLoading,
  errorMessage,
}: FileStateProps): JSX.Element => {
  if (isLoading && !fileState)
    return <Text className="">{translate('Loading')}</Text>;
  switch (fileState) {
    case 'paused':
      return <Text className="">{translate('Paused')}</Text>;
    case 'success':
      return (
        <Flex direction="row" gap="xxs" color="font.success">
          <CheckIcon fontSize="xl" /> {translate('Uploaded successfully')}
        </Flex>
      );
    case 'error':
      return (
        <Flex direction="row" gap="xxs" color="font.error">
          <ErrorIcon fontSize="xl" />
          <Text>{errorMessage}</Text>
        </Flex>
      );
    default:
      return null;
  }
};
