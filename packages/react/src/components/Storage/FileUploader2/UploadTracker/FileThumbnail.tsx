import React from 'react';

import { View, Image, ComponentClassNames } from '../../../../primitives';
import { IconFile } from '../../../../primitives/Icon/internal';

interface FileThumbnailProps {
  hasImage: boolean;
  showImage: boolean;
  file: File;
  url: string;
}

export const FileThumbnail = ({
  hasImage,
  showImage,
  file,
  url,
}: FileThumbnailProps): JSX.Element => {
  const thumbnail = hasImage ? (
    <Image alt={file.name} src={url} />
  ) : (
    <IconFile />
  );

  return showImage ? (
    <View className={ComponentClassNames.FileUploaderFileImage}>
      {thumbnail}
    </View>
  ) : null;
};
