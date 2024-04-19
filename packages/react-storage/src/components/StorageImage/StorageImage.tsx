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
  onStorageGetError,
  validateObjectExistence,
  ...rest
}: StorageImageProps): JSX.Element => {
  useDeprecationWarning({
    message:
      'The `imgKey` prop has been deprecated and will be removed in a future major version of Amplify UI.',
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
  validateObjectExistence = false,
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
      src={url?.toString()}
    />
  );
};

const hasKey = (
  props: StorageImageProps | StorageImagePathProps
): props is StorageImageProps => {
  if (
    (props as StorageImageProps).imgKey &&
    (props as StorageImagePathProps).path
  ) {
    throw new Error('StorageImage cannot have both imgKey and path props.');
  }
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
