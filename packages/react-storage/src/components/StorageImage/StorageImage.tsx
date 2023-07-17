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
  const useStorageURLParams = React.useMemo(
    () => ({
      key: imgKey,
      options: { level: accessLevel, identityId },
      fallbackURL: fallbackSrc,
      onStorageGetError,
    }),
    [accessLevel, fallbackSrc, identityId, imgKey, onStorageGetError]
  );

  const url = useStorageURL(useStorageURLParams);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassNames.StorageImage, className)}
      src={url}
    />
  );
};
