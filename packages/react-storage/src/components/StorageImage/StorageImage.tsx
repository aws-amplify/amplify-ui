import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
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
    () => ({ accessLevel, identityId }),
    [accessLevel, identityId]
  );

  const url = useStorageURL({
    key: imgKey,
    options: {
      ...options,
      validateObjectExistence: true,
    },
    fallbackURL: fallbackSrc,
    onStorageGetError,
  });

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url}
    />
  );
};
