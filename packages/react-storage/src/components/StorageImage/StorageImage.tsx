import * as React from 'react';
import classNames from 'classnames';

import { setCustomUserAgent } from '@aws-amplify/core/internals/utils';
import { storageImageDataPlaneState } from '@aws-amplify/ui';
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
    options,
    fallbackURL: fallbackSrc,
    onStorageGetError,
  });

  React.useEffect(() => {
    const clearCustomUserAgent = setCustomUserAgent(storageImageDataPlaneState);
    return () => clearCustomUserAgent();
  }, []);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url}
    />
  );
};
