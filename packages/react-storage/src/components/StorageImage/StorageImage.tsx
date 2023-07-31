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
    () => ({ level: accessLevel, identityId }),
    [accessLevel, identityId]
  );

  const url = useStorageURL({
    key: imgKey,
    options,
    fallbackURL: fallbackSrc,
    onStorageGetError,
  });

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassNames.StorageImage, className)}
      src={url}
    />
  );
};
