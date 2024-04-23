import * as React from 'react';

import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useDeprecationWarning } from '@aws-amplify/ui-react/internal';
import { useGetUrl, useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImageProps, StorageImagePathProps } from './types';

export const StorageImageWithKey = ({
  accessLevel,
  className,
  fallbackSrc,
  identityId,
  imgKey,
  path,
  onStorageGetError,
  validateObjectExistence = true,
  ...rest
}: StorageImageProps): JSX.Element => {
  if (imgKey && path) {
    throw new Error('StorageImage cannot have both imgKey and path props.');
  }
  useDeprecationWarning({
    message:
      'The `imgKey` prop has been deprecated and will be removed in the next major version of Amplify UI.',
    shouldWarn: true,
  });

  const input = React.useMemo(() => {
    return {
      key: imgKey,
      onError: onStorageGetError,
      options: {
        accessLevel,
        targetIdentityId: identityId,
        validateObjectExistence,
      },
    };
  }, [
    accessLevel,
    imgKey,
    onStorageGetError,
    identityId,
    validateObjectExistence,
  ]);

  const { url } = useGetUrl(input);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url?.toString() ?? fallbackSrc}
    />
  );
};

export const StorageImageWithPath = ({
  className,
  path,
  onGetUrlError,
  fallbackSrc,
  validateObjectExistence = true,
  ...rest
}: StorageImagePathProps): JSX.Element => {
  const input = React.useMemo(() => {
    return {
      path,
      onError: onGetUrlError,
      options: {
        validateObjectExistence,
      },
    };
  }, [path, onGetUrlError, validateObjectExistence]);

  const { url } = useGetUrl(input);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url?.toString() ?? fallbackSrc}
    />
  );
};

const hasKey = (
  props: StorageImageProps | StorageImagePathProps
): props is StorageImageProps => {
  return !!(props as StorageImageProps).imgKey;
};

export const StorageImage = (
  props: StorageImageProps | StorageImagePathProps
): JSX.Element => {
  useSetUserAgent({
    componentName: 'StorageImage',
    packageName: 'react-storage',
    version: VERSION,
  });

  return hasKey(props) ? (
    <StorageImageWithKey {...props} />
  ) : (
    <StorageImageWithPath {...props} />
  );
};
