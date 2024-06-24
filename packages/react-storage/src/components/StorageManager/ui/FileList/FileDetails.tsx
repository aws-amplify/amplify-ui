import React from 'react';
import { storageManagerClasses } from '@aws-amplify/ui';
import { Text, View } from '@aws-amplify/ui-react';
import { humanFileSize } from '../../utils';
import { UploadDetailsProps } from './types';

export const UploadDetails = ({
  displayName,
  fileSize,
}: UploadDetailsProps): JSX.Element => {
  return (
    <>
      <View className={storageManagerClasses({ _element: 'file__main' })}>
        <Text className={storageManagerClasses({ _element: 'file__name' })}>
          {displayName}
        </Text>
      </View>
      <Text
        as="span"
        className={storageManagerClasses({ _element: 'file__size' })}
      >
        {fileSize ? humanFileSize(fileSize, true) : ''}
      </Text>
    </>
  );
};
