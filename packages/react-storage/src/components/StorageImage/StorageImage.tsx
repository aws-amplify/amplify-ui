import * as React from 'react';

import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useDeprecationWarning } from '@aws-amplify/ui-react/internal';
import { useGetUrl, useSetUserAgent } from '@aws-amplify/ui-react-core';
import { GetUrlInput } from 'aws-amplify/storage';
import { VERSION } from '../../version';
import type { StorageImageProps, StorageImagePathProps } from './types';

type UseGetUrlInput = GetUrlInput & {
  onError?: (error: Error) => void;
};

export const StorageImage = ({
  accessLevel,
  className,
  fallbackSrc,
  identityId,
  imgKey,
  path,
  onStorageGetError,
  onGetUrlError,
  validateObjectExistence = true,
  ...rest
}: StorageImageProps | StorageImagePathProps): JSX.Element => {
  if (imgKey && path) {
    throw new Error('StorageImage cannot have both imgKey and path props.');
  }
  useDeprecationWarning({
    message:
      'The `imgKey` prop has been deprecated and will be removed in the next major version of Amplify UI.',
    shouldWarn: !!imgKey,
  });

  useSetUserAgent({
    componentName: 'StorageImage',
    packageName: 'react-storage',
    version: VERSION,
  });

  // @ts-ignore
  const input: UseGetUrlInput = React.useMemo(() => {
    const hasKey = !!imgKey;
    return {
      ...(hasKey ? { key: imgKey } : { path }),
      onError: onGetUrlError ?? onStorageGetError,
      options: {
        ...(accessLevel ? { accessLevel } : {}),
        ...(hasKey ? { targetIdentityId: identityId } : {}),
        validateObjectExistence,
      },
    };
  }, [
    accessLevel,
    imgKey,
    path,
    identityId,
    validateObjectExistence,
    onGetUrlError,
    onStorageGetError,
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
