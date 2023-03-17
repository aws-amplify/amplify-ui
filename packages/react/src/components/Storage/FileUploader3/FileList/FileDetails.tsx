import React from 'react';
import { IconEdit } from '../../../../primitives/Icon/icons';
import {
  Button,
  Text,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';
import { humanFileSize } from '@aws-amplify/ui';
import { UploadDetailsProps } from './types';

export const UploadDetails = ({
  displayName,
  fileSize,
  onClick,
  showEditButton,
}: UploadDetailsProps): JSX.Element => {
  return (
    <>
      <View className={ComponentClassNames.FileUploaderFileMain}>
        <Text className={ComponentClassNames.FileUploaderFileName}>
          {displayName}
        </Text>
      </View>
      {showEditButton ? (
        <Button onClick={onClick} size="small" variation="link">
          <VisuallyHidden>Edit file name {displayName}</VisuallyHidden>
          <IconEdit aria-hidden fontSize="medium" />
        </Button>
      ) : null}
      <Text as="span" className={ComponentClassNames.FileUploaderFileSize}>
        {humanFileSize(fileSize, true)}
      </Text>
    </>
  );
};
