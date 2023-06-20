import * as React from 'react';

import { isFunction } from '@aws-amplify/ui';
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

  if (error && isFunction(onStorageError)) {
    onStorageError(error);
  }

  return (
    <Image {...rest} className={ComponentClassNames.StorageImage} src={url} />
  );
};
