import React from 'react';
import { IconEdit } from '../../../../primitives/Icon/icons';
import {
  Button,
  Text,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';
import { FileState } from '../types';
import { humanFileSize } from '@aws-amplify/ui';
import { FileDetailsProps } from './types';

export const FileDetails = ({
  file,
  onStartEdit,
  fileState,
  extensionNotAllowedText,
  errorMessage,
  displayName,
}: FileDetailsProps): JSX.Element => {
  const showEditButton =
    fileState === FileState.INIT ||
    (fileState === FileState.ERROR && errorMessage === extensionNotAllowedText);

  return (
    <>
      <View className={ComponentClassNames.FileUploaderFileMain}>
        <Text className={ComponentClassNames.FileUploaderFileName}>
          {displayName}
        </Text>
      </View>
      {showEditButton ? (
        <Button onClick={onStartEdit} size="small" variation="link">
          <VisuallyHidden>Edit file name {file.name}</VisuallyHidden>
          <IconEdit aria-hidden fontSize="medium" />
        </Button>
      ) : null}
      <Text as="span" className={ComponentClassNames.FileUploaderFileSize}>
        {humanFileSize(file.size, true)}
      </Text>
    </>
  );
};
