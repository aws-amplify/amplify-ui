import React from 'react';

import { View, Image, ComponentClassNames } from '@aws-amplify/ui-react';
import { IconFile, useIcons } from '@aws-amplify/ui-react/internal';
import { FileThumbnailProps } from './types';

export const FileThumbnail = ({
  fileName,
  isImage,
  url,
}: FileThumbnailProps): JSX.Element => {
  const icons = useIcons('storageManager');
  const thumbnail = isImage ? (
    <Image alt={fileName} src={url} />
  ) : (
    icons?.file ?? <IconFile />
  );

  return (
    <View className={ComponentClassNames.StorageManagerFileImage}>
      {thumbnail}
    </View>
  );
};
