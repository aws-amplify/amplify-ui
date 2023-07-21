import React from 'react';

import {
  View,
  Image,
  ComponentClassNames,
  useIcons,
} from '@aws-amplify/ui-react';
import { IconFile } from '@aws-amplify/ui-react/internal';
import { FileThumbnailProps } from './types';

export const FileThumbnail = ({
  fileName,
  isImage,
  url,
}: FileThumbnailProps): JSX.Element => {
  const icons = useIcons();
  const thumbnail = isImage ? (
    <Image alt={fileName} src={url} />
  ) : (
    icons?.storageManager?.file ?? <IconFile />
  );

  return (
    <View className={ComponentClassNames.StorageManagerFileImage}>
      {thumbnail}
    </View>
  );
};
