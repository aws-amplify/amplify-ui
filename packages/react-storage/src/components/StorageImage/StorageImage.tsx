import * as React from 'react';

import { classNames, ComponentClassName, isUndefined } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useStorageURL } from '@aws-amplify/ui-react/internal';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImageProps } from './types';

export const StorageImage = ({
  accessLevel,
  className,
  fallbackSrc,
  identityId,
  imgKey,
  onStorageGetError,
  validateObjectExistence,
  ...rest
}: StorageImageProps): JSX.Element => {
  const resolvedValidateObjectExistence = isUndefined(validateObjectExistence)
    ? true
    : validateObjectExistence;
  const options = React.useMemo(
    () => ({
      accessLevel,
      targetIdentityId: identityId,
      validateObjectExistence: resolvedValidateObjectExistence,
    }),
    [accessLevel, identityId, resolvedValidateObjectExistence]
  );

  useSetUserAgent({
    componentName: 'StorageImage',
    packageName: 'react-storage',
    version: VERSION,
  });

  const url = useStorageURL({
    key: imgKey,
    options,
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
