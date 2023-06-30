import React from 'react';

import {
  View,
  Image,
  ComponentClassNames,
  useTheme,
  Icon,
} from '@aws-amplify/ui-react';
import { FileThumbnailProps } from './types';

export const FileThumbnail = ({
  fileName,
  isImage,
  url,
}: FileThumbnailProps): JSX.Element => {
  const { icons } = useTheme();
  const thumbnail = isImage ? (
    <Image alt={fileName} src={url} />
  ) : (
    <Icon {...icons.storageManager.file} />
  );

  return (
    <View className={ComponentClassNames.StorageManagerFileImage}>
      {thumbnail}
    </View>
  );
};
