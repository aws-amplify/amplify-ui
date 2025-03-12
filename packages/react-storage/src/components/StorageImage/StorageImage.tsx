import * as React from 'react';

import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image, View } from '@aws-amplify/ui-react';
import { useDeprecationWarning } from '@aws-amplify/ui-react/internal';
import { useGetUrl, useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImageProps, StorageImagePathProps } from './types';

export const MISSING_REQUIRED_PROP_MESSAGE =
  '`StorageImage` requires either an `imgKey` or `path` prop.';

export const HAS_DEPRECATED_PROPS_MESSAGE =
  '`imgKey`, `accessLevel`, and `identityId` will be replaced with `path` in a future major version. See https://ui.docs.amplify.aws/react/connected-components/storage/storageimage#props';

export const HAS_PATH_AND_KEY_MESSAGE =
  '`imgKey` is ignored when both `imgKey` and `path` props are provided.';

export const HAS_PATH_AND_UNSUPPORTED_OPTIONS_MESSAGE =
  '`accessLevel` and `identityId` are ignored when the `path` prop is provided.';

const getDeprecationMessage = ({
  hasImgkey,
  hasPath,
  hasDeprecatedOptions,
}: {
  hasImgkey: boolean;
  hasPath: boolean;
  hasDeprecatedOptions: boolean;
}): string => {
  let message = '';

  if (hasPath && hasImgkey) {
    message = HAS_PATH_AND_KEY_MESSAGE;
  } else if (hasPath && hasDeprecatedOptions) {
    message = HAS_PATH_AND_UNSUPPORTED_OPTIONS_MESSAGE;
  } else if (hasImgkey) {
    message = HAS_DEPRECATED_PROPS_MESSAGE;
  }

  return message;
};

export const StorageImage = ({
  accessLevel,
  bucket,
  className,
  fallbackSrc,
  identityId,
  imgKey,
  path,
  onStorageGetError,
  onGetUrlError,
  validateObjectExistence = true,
  style,
  ...rest
}: StorageImageProps | StorageImagePathProps): React.JSX.Element => {
  const hasImgkey = !!imgKey;
  const hasPath = !!path;
  const hasDeprecatedOptions = !!accessLevel || !!identityId;

  const message = getDeprecationMessage({
    hasDeprecatedOptions,
    hasImgkey,
    hasPath,
  });
  useDeprecationWarning({ message, shouldWarn: !!message });

  if (!hasImgkey && !hasPath) {
    throw new Error(MISSING_REQUIRED_PROP_MESSAGE);
  }

  useSetUserAgent({
    componentName: 'StorageImage',
    packageName: 'react-storage',
    version: VERSION,
  });

  const onError = onGetUrlError ?? onStorageGetError;
  const input = React.useMemo(
    () => ({
      ...(path ? { path } : { key: imgKey! }), // if `path` is falsy `imgKey` exists
      onError,
      options: {
        accessLevel,
        bucket,
        targetIdentityId: identityId,
        validateObjectExistence,
      },
    }),
    [
      accessLevel,
      bucket,
      imgKey,
      identityId,
      onError,
      path,
      validateObjectExistence,
    ]
  );

  const { url, isLoading } = useGetUrl(input);

  if (isLoading) {
    return <View style={{ ...style }}></View>;
  }

  return (
    <Image
      {...rest}
      style={{ ...style }}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={url?.toString() ?? fallbackSrc}
    />
  );
};
