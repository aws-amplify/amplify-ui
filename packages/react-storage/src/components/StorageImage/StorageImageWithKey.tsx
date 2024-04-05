import * as React from 'react';

import { classNames, ComponentClassName, isUndefined } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useGetURL } from '@aws-amplify/ui-react/internal';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImageProps } from './types';

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
  const [imgUrl, setImgURL] = React.useState<string>();

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

  // TODO isloading
  const { url } = useGetURL({
    key: imgKey,
    options,
    onError: onStorageGetError,
  });

  React.useEffect(() => {
    if (url) {
      setImgURL(url.toString());
    } else if (fallbackSrc) {
      setImgURL(fallbackSrc);
    }
  }, [url, fallbackSrc]);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={imgUrl}
    />
  );
};
