import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Image } from '@aws-amplify/ui-react';
import { IconFile, useIcons } from '@aws-amplify/ui-react/internal';
import type { FileThumbnailProps } from './types';

export const FileThumbnail = ({
  fileName,
  isImage,
  url,
}: FileThumbnailProps): React.JSX.Element => {
  const icons = useIcons('storageManager');
  const thumbnail = isImage ? (
    <Image alt={fileName} src={url} />
  ) : (
    icons?.file ?? <IconFile />
  );

  return (
    <View className={ComponentClassName.FileUploaderFileImage}>
      {thumbnail}
    </View>
  );
};
