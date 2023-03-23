import React from 'react';
import { Text, ComponentClassNames, View } from '../../../../primitives';
import { humanFileSize } from '@aws-amplify/ui';
import { UploadDetailsProps } from './types';

export const UploadDetails = ({
  displayName,
  fileSize,
}: UploadDetailsProps): JSX.Element => {
  return (
    <>
      <View className={ComponentClassNames.StorageManagerFileMain}>
        <Text className={ComponentClassNames.StorageManagerFileName}>
          {displayName}
        </Text>
      </View>
      <Text as="span" className={ComponentClassNames.StorageManagerFileSize}>
        {humanFileSize(fileSize, true)}
      </Text>
    </>
  );
};
