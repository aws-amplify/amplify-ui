import React from 'react';

import { View, Image, ComponentClassNames } from '../../../../primitives';
import { IconFile } from '../../../../primitives/Icon/internal';
import { FileThumbnailProps } from './types';

export const FileThumbnail = ({
  fileName,
  isImage,
  url,
}: FileThumbnailProps): JSX.Element => {
  const thumbnail = isImage ? <Image alt={fileName} src={url} /> : <IconFile />;

  return (
    <View className={ComponentClassNames.FileUploaderFileImage}>
      {thumbnail}
    </View>
  );
};
