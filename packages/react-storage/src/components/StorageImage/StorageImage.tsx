import * as React from 'react';

import { Image, ComponentClassNames } from '@aws-amplify/ui-react';
import { useStorageURL } from '@aws-amplify/ui-react/internal';

import type { StorageImageProps } from './types';

export const StorageImage = ({
  imgKey,
  accessLevel,
  identityId,
  fallbackSrc,
  onStorageError,
  ...rest
}: StorageImageProps): JSX.Element => {
  const { url, error } = useStorageURL(
    imgKey,
    { level: accessLevel, identityId },
    fallbackSrc
  );

  if (error && onStorageError) {
    onStorageError(error);
  }

  return (
    <Image className={ComponentClassNames.StorageImage} src={url} {...rest} />
  );
};
