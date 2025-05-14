import React from 'react';
import { ComponentClassName, humanFileSize } from '@aws-amplify/ui';
import { Text, View } from '@aws-amplify/ui-react';
import type { UploadDetailsProps } from './types';

export const UploadDetails = ({
  displayName,
  fileSize,
}: UploadDetailsProps): React.JSX.Element => {
  return (
    <>
      <View className={ComponentClassName.StorageManagerFileMain}>
        <Text className={ComponentClassName.StorageManagerFileName}>
          {displayName}
        </Text>
      </View>
      <Text as="span" className={ComponentClassName.StorageManagerFileSize}>
        {fileSize ? humanFileSize(fileSize, true) : ''}
      </Text>
    </>
  );
};
