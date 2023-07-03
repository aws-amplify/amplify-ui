import * as React from 'react';
import classNames from 'classnames';

import { isFunction } from '@aws-amplify/ui';
import { Image, ComponentClassNames } from '@aws-amplify/ui-react';
import { useStorageURL } from '@aws-amplify/ui-react/internal';

import type { StorageImageProps } from './types';

export const StorageImage = ({
  accessLevel,
  className,
  fallbackSrc,
  identityId,
  imgKey,
  onStorageGetError,
  ...rest
}: StorageImageProps): JSX.Element => {
  const { url, error } = useStorageURL(
    imgKey,
    { level: accessLevel, identityId },
    fallbackSrc
  );

  if (error && isFunction(onStorageGetError)) {
    onStorageGetError(error);
  }

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassNames.StorageImage, className)}
      src={url}
    />
  );
};
