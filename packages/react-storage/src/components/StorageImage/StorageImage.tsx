import * as React from 'react';

import {
  GetUrlInput,
  GetUrlWithPathInput,
  GetUrlOutput,
} from 'aws-amplify/storage';

import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useDeprecationWarning } from '@aws-amplify/ui-react/internal';
import { useGetUrl, useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImageProps, StorageImagePathProps } from './types';

type UseGetUrlInput = (GetUrlInput | GetUrlWithPathInput) & {
  onError?: (error: Error) => void;
};

type UseGetUrl = (
  input: UseGetUrlInput
) => GetUrlOutput & { isLoading: boolean };

const hasKeyProps = (
  props: StorageImageProps | StorageImagePathProps
): props is StorageImageProps => {
  return !!(props as StorageImageProps).imgKey;
};

export const StorageImage = (
  props: StorageImageProps | StorageImagePathProps
): JSX.Element => {
  const {
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
  } = props;

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

  // @ts-expect-error `imgKey` and `path` are mutually exclusive
  const input: UseGetUrlInput = React.useMemo(() => {
    const hasKey = hasKeyProps(props);
    return {
      ...(hasKey ? { key: imgKey } : { path }),
      onError: onGetUrlError ?? onStorageGetError,
      options: {
        ...(hasKey ? { accessLevel } : undefined),
        ...(hasKey ? { targetIdentityId: identityId } : undefined),
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
    props,
  ]);

  const { url } = (useGetUrl as UseGetUrl)(input);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url?.toString() ?? fallbackSrc}
    />
  );
};
