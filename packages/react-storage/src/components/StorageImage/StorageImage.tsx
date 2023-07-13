import * as React from 'react';
import classNames from 'classnames';

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
  const options = React.useMemo(
    () => ({
      accessLevel,
      identityId,
    }),
    [accessLevel, identityId]
  );

  const errorConfig = React.useMemo(
    () => ({
      fallbackURL: fallbackSrc,
      onError: onStorageGetError,
    }),
    [fallbackSrc, onStorageGetError]
  );

  const { url } = useStorageURL(imgKey, options, errorConfig);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassNames.StorageImage, className)}
      src={url}
    />
  );
};
